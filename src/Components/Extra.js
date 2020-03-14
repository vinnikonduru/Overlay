import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import crypto from 'crypto';
import DoenetViewer from './DoenetViewer';
import DoenetHeader from './DoenetHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt as externalLink } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose as closeExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft as openPanel } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight as closePanel } from '@fortawesome/free-solid-svg-icons';
import "./editor.css";
// import * as ComponentTypes from '../Doenet/ComponentTypes';
import allComponents from '../../docs/complete-docs.json';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/xml';
import 'brace/theme/textmate';
import ErrorBoundary from './ErrorBoundary';




class DoenetEditor extends Component {
  constructor(props) {
    super(props);
    this.documentProps = Object.keys(allComponents.document.properties);
    
    this.saveTimer = null;

    this.contextPanel = <div id="contextPanel"><p>loading...</p></div>
    this.doenetML = "";
    let url_string = window.location.href;
    var url = new URL(url_string);
    this.contentId = url.searchParams.get("contentId");
    this.branchId = url.searchParams.get("branchId");
    this.updateNumber = 0;

    var errorMsg = null;
    var loading = true;

    this.contentIds_array = [];
    this.contentIdInURL = false;

    if (this.contentId !== null && this.branchId === null) {
      //Can't get branchId from contentId.  No way to tell which branch.
      errorMsg = "ERROR: Need a branch id in order to know which branch to save the updates.";
      loading = false;
    }
    else if (this.contentId !== null || this.branchId !== null) {
      //Load most recent content from the branch or
      //Load specific branch's content id if it is given      

      if (this.contentId !== null ){ this.contentIdInURL = true; }

      const phpUrl = '/api/getDoenetML.php';
      const data = {
        branchId: this.branchId,
        contentId: this.contentId,
      }
      const payload = {
        params: data
      }

      axios.get(phpUrl, payload)
        .then(resp => {
          
          if (resp.data.access === false){
            this.setState({loading:false,accessAllowed:false});
          }else{
            this.updateNumber++;
            this.contentIds_array = resp.data.contentIds;
            let publish_button_enabled = this.should_publish_button_be_enabled({editorDoenetML:resp.data.doenetML});
            let version = this.describe_version({publish_button_enabled:publish_button_enabled,doenetML:resp.data.doenetML})
  
            this.setState({
              documentTitle:resp.data.title,
              loading:false,
              publish_button_enabled:publish_button_enabled,
              editorDoenetML:resp.data.doenetML,
              viewerDoenetML:resp.data.doenetML,
              version:version,
            }) ;
          }
          
        })
        .catch((error) => {
          this.setState({ error: error })
        })
    } else {
      //Redirect to chooser if no branch id
      window.location.href = "/chooser";
    }

    let deviceGivenWidth = this.widthToDevice();


    this.state = {
      editorDoenetML: "",
      viewerDoenetML: "",
      fontSize: 12,
      search: "",
      documentTitle: "",
      errorMsg: errorMsg,
      show_context_panel: false,
      phone_panel_active: "Editor",
      allowViewSolutionWithoutRoundTrip: true,
      solutionType: "button",
      showHints: true,
      showFeedback: true,
      showCorrectness: true,
      loading: loading,
      publish_button_enabled:false,
      external_viewer_window:false,
      deviceGivenWidth:deviceGivenWidth,
      version:"",
      accessAllowed:true,
    }

    this.handleDoenetMLChange = this.handleDoenetMLChange.bind(this);
    this.saveDoenetMLChanges = this.saveDoenetMLChanges.bind(this);
    this.handleViewerUpdate = this.handleViewerUpdate.bind(this);
    // this.onCursorChange = this.onCursorChange.bind(this);
    this.publish = this.publish.bind(this);
    this.should_publish_button_be_enabled = this.should_publish_button_be_enabled.bind(this);
    this.openExternalViewerWindow = this.openExternalViewerWindow.bind(this);
    this.external_viewer_window_incoming_messages = this.external_viewer_window_incoming_messages.bind(this);
    this.handleViewerClose = this.handleViewerClose.bind(this);
    this.windowResizeHandler = this.windowResizeHandler.bind(this);
    this.describe_version = this.describe_version.bind(this);

    window.onmessage = this.external_viewer_window_incoming_messages;
    this.viewerWindow = null;
  }

  describe_version({publish_button_enabled,doenetML}){
    if (publish_button_enabled){
      return "draft";
    }else{
      //figure out version
      let current_contentId = this.getContentId({doenetML:doenetML});
      let index = this.contentIds_array.indexOf(current_contentId) + 1;
      
      return `${index}`;

    }
  }

  windowResizeHandler(){
    let deviceGivenWidth = this.widthToDevice();
    if (this.state.deviceGivenWidth !== deviceGivenWidth){
      this.setState({deviceGivenWidth: deviceGivenWidth});
    }
  }

  widthToDevice(){
    let w = document.documentElement.clientWidth;
    if (w >= 1024){ return "computer"; }
    if (w < 1024 && w >= 768){ return "tablet"; }
    return "phone";
  }
  
  componentDidMount(){
    window.addEventListener("resize",this.windowResizeHandler);
  }

  componentWillUnmount(){
    window.removeEventListener("resize",this.windowResizeHandler);
  }

  external_viewer_window_incoming_messages(e){
    
    if (e.data.request === "doenetML update"){
      this.viewerWindow.postMessage({doenetML: this.state.editorDoenetML},"*");
      this.setState({viewerDoenetML:this.state.editorDoenetML});
    }
    
  }

  should_publish_button_be_enabled({editorDoenetML}){
    let publish_button_enabled = true;
    let current_contentId = this.getContentId({doenetML:editorDoenetML});
    if (this.contentIds_array.includes(current_contentId)){publish_button_enabled = false;}
    return publish_button_enabled;
  }

  calculate_documentTitle({doenetML,currentTitle}){
    let newTitle = currentTitle;
    let searchDoenetML = doenetML;
    let expectedDocTitleTags = [...this.documentProps,"document"];
    let cursor = 0;

    let result = findNextTag({code:searchDoenetML,index:cursor});
    
    if (!expectedDocTitleTags.includes(result.tagType)){
      return newTitle;
    }
    if (result.tagType === "title"){
      let endTagIndex = doenetML.indexOf("</title>");
      let newTitle = doenetML.substring(Number(result.tagIndex) + Number(result.tagString.length),endTagIndex );
      return newTitle;
    }
    if (result.tagType === "document"){
      cursor = cursor + Number(result.tagIndex) + Number(result.tagString.length);
      searchDoenetML = searchDoenetML.substring(cursor,searchDoenetML.length);
    }

    expectedDocTitleTags.pop(); //remove document
    
    
    result = findNextTag({code:searchDoenetML,index:cursor});
    if (!expectedDocTitleTags.includes(result.tagType)){
      return newTitle;
    }
    if (result.tagType === "title"){
      let endTagIndex = searchDoenetML.indexOf("</title>");
      let newTitle = searchDoenetML.substring(Number(result.tagIndex) + Number(result.tagString.length),endTagIndex );
      return newTitle;
    }
  
    return newTitle;
  }

  updateLocationBar(assignmentId=this.assignmentId, activeSection=this.activeSection){
    history.replaceState({},"title","?active="+activeSection);
    if (this.activeSection === "assignments") {
      console.log(this.assignmentId);
      history.replaceState({},"title","?active="+activeSection+"&assignmentId="+assignmentId);
    }
  }

  handleDoenetMLChange(editorDoenetML, e) {
    if (this.saveTimer === null) {
      this.saveTimer = setTimeout(
        () => { this.saveDoenetMLChanges({ blur: false }); }
        , 3000);
    }
    if (this.contentIdInURL){
      history.replaceState({},"title","?branchId="+this.branchId);
      this.contentIdInURL = false;
    }

    let publish_button_enabled = this.should_publish_button_be_enabled({editorDoenetML:editorDoenetML});
    let version = this.describe_version({publish_button_enabled:publish_button_enabled,doenetML:editorDoenetML})

    
    let documentTitle = this.calculate_documentTitle({doenetML:editorDoenetML,currentTitle:this.state.documentTitle});
    // if (e.action === 'remove') {
    //   let cursor = this.refs.aceEditor.editor.selection.getCursor();
    //   const row = cursor.row;
    //   const column = cursor.column;
      //this.exceptionForRemoveCode = editorDoenetML;
      // this.updateContextPanel(row, column);
    // }

    this.setState({ 
      editorDoenetML: editorDoenetML, 
      publish_button_enabled:publish_button_enabled,
      documentTitle: documentTitle,
      version: version,
     });
  }

  saveDoenetMLChanges({ blur=false, publish=false }) {

    if (blur) {
      clearTimeout(this.saveTimer);
    }
    this.saveTimer = null;
  
    let contentIdForSaving = this.getContentId({ doenetML: this.state.editorDoenetML });

    const url = '/api/saveContent.php';
    const data = {
      title: this.state.documentTitle,
      doenetML: this.state.editorDoenetML,
      branchId: this.branchId,
      contentId: contentIdForSaving,
      publish: publish,
    }


      axios.post(url, data)
        .then(resp=>{
          
          
          if (resp.data.access === false){
            this.setState({loading:false,accessAllowed:false});
          }

          //Add contentId and timestamp here from server
        })
      .catch(function (error) {
      this.setState({errorMsg:error}); 
      }) 

    return contentIdForSaving;
  }

  getContentId ({doenetML}){
    const hash = crypto.createHash('sha256');
    if (doenetML === undefined){
      return;
    }
    
    hash.update(doenetML);
    let contentId = hash.digest('hex');
    return contentId;
  }

  publish() {
    let contentIdForPublishing = this.saveDoenetMLChanges({publish:true});
    this.contentIds_array.push(contentIdForPublishing);
    this.setState({ publish_button_enabled: false });

  }

  handleViewerUpdate(){
    this.updateNumber++;
    this.setState({viewerDoenetML:this.state.editorDoenetML});
  }

  handleViewerClose(){
    this.updateNumber++;
    this.setState({external_viewer_window:false});
  }

  openExternalViewerWindow(){

    this.viewerWindow = window.open(`/viewer`,'Doenet Viewer',`width=${window.innerWidth},height=${window.innerHeight},left=1700,top=0,titlebar=no`);
    this.viewerWindow.onbeforeunload = this.handleViewerClose;
    this.viewerWindow.onload = function(){ 
        this.viewerWindow.postMessage({doenetML: this.state.viewerDoenetML},"*");
        }.bind(this);

    if(this.state.phone_panel_active === "Viewer"){
      this.setState({phone_panel_active:"Editor"});
    }
    this.setState({external_viewer_window:true});
  }


  render() {

    if (this.state.loading){
      return (<p>Loading...</p>)
    }

    if (!this.state.accessAllowed){
      return (<p>You don't have Admin access.</p>)
    }

    let aceprops = {
      mode: "xml",
      "data-cy": "editorTextEntry",
      name: "editorTextEntry",
      theme: "textmate",
      height: "100%",
      width: "100%",
      fontSize: this.state.fontSize+"pt",
      tabSize: 2,

      onChange: this.handleDoenetMLChange,
      //onCursorChange:this.onCursorChange,
      //onSelectionChange:this.onSelectionChange,
      editorProps: { $blockScrolling: true },
      //onBlur:()=>{this.saveDoenetMLChanges({blur:true})},
      // marker:markers,
      ref: "aceEditor",

      // ref=this.aceref,
      // enableSnippets:true,
    }
    

    let context_panel_menu_style = {};
    let context_panel_style = {};
    let doenet_editor_menu_style = {};
    let doenet_editor_style = {};
    let viewer_panel_menu_style = {};
    let viewer_panel_style = {};

    let viewer_panel_button_style = {};
    let show_hide_context_panel_button_style = {}
    


    if (!this.state.show_context_panel && !this.state.external_viewer_window){
      //Context Panel Closed 
      //Viewer Panel NOT External
      if (this.state.deviceGivenWidth !== "phone"){
        doenet_editor_style = {
          gridColumn: "1 / 3"
        }
        doenet_editor_menu_style = {
          gridColumn: "1 / 3"
        }
        context_panel_style = { display: "none"}
        context_panel_menu_style = { display: "none"}
      }
    }else if (!this.state.show_context_panel && this.state.external_viewer_window){
      //Context Panel Closed 
      //Viewer Panel External
      

      if (this.state.deviceGivenWidth !== "phone"){

        doenet_editor_style = {
          gridColumn: "1 / 4"
        }
        doenet_editor_menu_style = {
          gridColumn: "1 / 4"
        }
        context_panel_style = { display: "none"}
        context_panel_menu_style = { display: "none"}
        viewer_panel_style = { display: "none"}
        viewer_panel_menu_style = { display: "none"}
      }
      if (this.state.deviceGivenWidth === "tablet"){
        doenet_editor_style["gridRow"] = "2 / 5";
      }
      

    }else if (this.state.show_context_panel && this.state.external_viewer_window){
      //Context Panel Open 
      //Viewer Panel External
      if (this.state.deviceGivenWidth === "computer"){

        doenet_editor_style = {
          gridColumn: "2 / 4"
        }
        doenet_editor_menu_style = {
          gridColumn: "2 / 4"
        }
        viewer_panel_style = { display: "none"}
        viewer_panel_menu_style = { display: "none"}
      }else if (this.state.deviceGivenWidth === "tablet"){
        doenet_editor_menu_style = {
          gridColumn: "2 / 3",
          gridRow: "1 / 2"
        }
        doenet_editor_style = {
          gridColumn: "2 / 4",
          gridRow: "2 / 5"
        }
       
        viewer_panel_style = { display: "none"}
        viewer_panel_menu_style = { display: "none"}
      }
    }

    if (this.state.deviceGivenWidth === "phone"){
      //PHONE
      show_hide_context_panel_button_style = { display: "none"}

      if (this.state.external_viewer_window){
        viewer_panel_button_style = { display: "none"}
      }

      
      if(this.state.phone_panel_active === "Editor"){
        context_panel_menu_style = { display: "none"}
        context_panel_style = { display: "none"}
        viewer_panel_menu_style = { display: "none"}
        viewer_panel_style = { display: "none"}
        
      }else if(this.state.phone_panel_active === "Viewer"){
        context_panel_menu_style = { display: "none"}
        context_panel_style = { display: "none"}
        doenet_editor_menu_style = { display: "none"}
        doenet_editor_style = { display: "none"}
        
      }else if(this.state.phone_panel_active === "Context Panel"){
        doenet_editor_menu_style = { display: "none"}
        doenet_editor_style = { display: "none"}
        viewer_panel_menu_style = { display: "none"}
        viewer_panel_style = { display: "none"}
        
      }
    }

    let show_hide_context_panel_icon = <FontAwesomeIcon icon={closePanel}/>
    if (this.state.show_context_panel){
      show_hide_context_panel_icon = <FontAwesomeIcon icon={openPanel}/>
    }

    let show_hide_context_panel_button = <button 
    style={show_hide_context_panel_button_style}
    onClick={()=>this.setState({show_context_panel:!this.state.show_context_panel})}
    >{show_hide_context_panel_icon}</button>
                    
    let textEditor = <AceEditor {...aceprops} value={this.state.editorDoenetML}/>
    let textEditorMenu = <React.Fragment>
    {show_hide_context_panel_button}
    <button disabled={!this.state.publish_button_enabled} onClick={this.publish}>Publish</button>
    <select onChange={(e)=>this.setState({fontSize:e.target.value})} value={this.state.fontSize}>
      <option>8</option>
      <option>10</option>
      <option>12</option>
      <option>14</option>
      <option>16</option>
      <option>18</option>
      <option>20</option>
      <option>22</option>
      <option>24</option>
      <option>30</option>
    </select>
    </React.Fragment>
    let contextPanel = <p>Context Panel is Coming Soon!</p>
    let contextPanelMenu = <p>Coming Soon!</p>

    let open_external_window_button = null;
    if (!this.state.external_viewer_window){
      open_external_window_button = <button onClick={this.openExternalViewerWindow}><FontAwesomeIcon icon={externalLink}/></button>
    }

    let doenetViewerMenu = <React.Fragment>
      <button onClick={this.handleViewerUpdate}>Update</button>
      {open_external_window_button}
      </React.Fragment>
    let doenetViewer = (<ErrorBoundary key={"doenetErrorBoundry"+this.updateNumber}><DoenetViewer 
              key={"doenetviewer"+this.updateNumber} //each component has their own key, change the key will trick Reach to look for new component
              free={{doenetCode: this.state.viewerDoenetML}} 
              mode={{
              solutionType:this.state.solutionType,
              allowViewSolutionWithoutRoundTrip:this.state.allowViewSolutionWithoutRoundTrip,
              showHints:this.state.showHints,
              showFeedback:this.state.showFeedback,
              showCorrectness:this.state.showCorrectness,
          }}           
          />
          </ErrorBoundary>)

   
        let title_text = `${this.state.documentTitle} (version ${this.state.version})`;
    
      return (
      <React.Fragment>
         <DoenetHeader toolTitle="Editor" headingTitle={title_text} />   
       
       <div id="editorContainer">

            <div style={context_panel_menu_style} id="contextPanelMenu">
              {contextPanelMenu}
            </div>
            <div style={context_panel_style} id="contextPanel">
              {contextPanel}
            </div>

            <div style={doenet_editor_menu_style} id="textEditMenu">
              {textEditorMenu}
            </div>
            <div style={doenet_editor_style} id="textEdit">
              {textEditor}
            </div>

            <div style={viewer_panel_menu_style} id="editViewMenu">
            {doenetViewerMenu}
            </div>
            <div style={viewer_panel_style} id="editView">
            {doenetViewer}
            </div>
            
              
      </div>

        <div id="pageNavPhone">
          <div className="pageNav">
            <button className="selected" onClick={()=>this.setState({phone_panel_active:"Context Panel"})} ><span>Context Panel</span></button>
            <button  className="selected" onClick={()=>this.setState({phone_panel_active:"Editor"})}><span>Editor</span></button>
            <button style={viewer_panel_button_style} className="selected" onClick={()=>this.setState({phone_panel_active:"Viewer"})} ><span>Viewer</span></button>
          </div>
        </div>

           
            {/* <AceEditor {...aceprops} value={this.state.doenetML}/> */}
    
      </React.Fragment>);
  }

}

function findNextTag({code,index}){
  let tagRegEx = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/;
  let matchObj = tagRegEx.exec(code);
  
  
  if (matchObj === null){return false;} //no tags so return
  let tagString = matchObj[0];
  //make tags lower case
  tagString = tagString.toLowerCase();
  let tagIndex =matchObj.index;

  //if next tag is a comment find the end of the comment and return the information about the comment.
  let startCommentIndex = code.search('<!--');
  if (startCommentIndex !== -1 && startCommentIndex < tagIndex){
    let endCommentIndex = code.search('-->');
    let unmatched = false;
    //if no end comment then the rest of the code is commented out
    if (endCommentIndex === -1){endCommentIndex = code.length; unmatched = true;} 
    tagString = code.substring(startCommentIndex,endCommentIndex+3);
  return {tagString:tagString,tagType:"comment",tagIndex:startCommentIndex,tagProps:{tagString:tagString},unmatched:unmatched};
  }
  
  //Find tagType
  let parts = tagString.split(" ");
  let tagType = parts[0].substring(1,parts[0].length - 1);
  if (parts.length > 1){
    tagType = parts[0].substring(1,parts[0].length);
  }
  if (tagType.substring(tagType.length - 1,tagType.length) === '/'){
    tagType = tagType.substring(0 ,tagType.length - 1);
  }

  let tagPropsString = matchObj[1];
  tagPropsString = tagPropsString.trim();
  let tagProps = {};

  //Process Double Quoted Props
  let startPropDoubleRegEx = /\w+\s*=\s*["]/;
  matchObj = "not null";  //need this to start the while loop
  while(matchObj !== null){
    matchObj = startPropDoubleRegEx.exec(tagPropsString);
    if (matchObj !== null){
     let followingCode = tagPropsString.substring(matchObj.index +matchObj[0].length -1,tagPropsString.length);
     let doubleQuoteRegEx = /"[^"\\]*(?:\\.[^"\\]*)*"/;
     let doubleMatchObj = doubleQuoteRegEx.exec(followingCode);
     let insideDoubleQuotes = doubleMatchObj[0].substring(1,doubleMatchObj[0].length - 1);
     let nameParts = matchObj[0].split('=');
     let propName = nameParts[0].trim().toLowerCase();
     if (propName.substring(0,1) === '_'){
      throw Error("The prop " + propName + " is reserved for internal use only.");
     }
     insideDoubleQuotes = insideDoubleQuotes.replace(/\\"/g,'"');
     if(propName in tagProps) {
       throw Error("Duplicate property " + propName + " in tag " + tagType);
     }
     tagProps[propName] = {};
     tagProps[propName].value = insideDoubleQuotes;
     tagProps[propName].quoteType = "double";
     //Find start and end of double quotes
     let indexOfPropName = tagString.search(propName);
     let afterTagName = tagString.substring(indexOfPropName,tagString.length);
     let indexOfDoubleQuote = afterTagName.search(`"`) + 1;
     let afterBeginningDoubleQuote = afterTagName.substring(indexOfDoubleQuote,afterTagName.length);
     let indexOfClosingDoubleQuote = afterBeginningDoubleQuote.search(`"`);
     tagProps[propName].indexOfStartQuote = indexOfPropName + indexOfDoubleQuote + tagIndex + index;
     tagProps[propName].indexOfEndQuote = indexOfPropName + indexOfDoubleQuote + indexOfClosingDoubleQuote + tagIndex + index;
     
     tagPropsString = tagPropsString.substring(0,matchObj.index) +
     tagPropsString.substring(matchObj.index + matchObj[0].length +
       doubleMatchObj[0].length,tagPropsString.length);
    }
  }

  //Process Single Quoted Props
  let startPropSingleRegEx = /\w+\s*=\s*[']/;
  matchObj = "not null";
  while(matchObj !== null){
    matchObj = startPropSingleRegEx.exec(tagPropsString);
    if (matchObj !== null){
     let followingCode = tagPropsString.substring(matchObj.index +matchObj[0].length -1,tagPropsString.length);
     let singleQuoteRegEx = /'[^'\\]*(?:\\.[^'\\]*)*'/;
     let singleMatchObj = singleQuoteRegEx.exec(followingCode);
     let insideSingleQuotes = singleMatchObj[0].substring(1,singleMatchObj[0].length - 1);
     let nameParts = matchObj[0].split('=');
     let propName = nameParts[0].trim().toLowerCase();
     if (propName.substring(0,1) === '_'){
       throw Error("The prop " + propName + " is reserved for internal use only.");
     }
     insideSingleQuotes = insideSingleQuotes.replace(/\\'/g,"'");
     if(propName in tagProps) {
       throw Error("Duplicate property " + propName + " in tag " + tagType);
     }
     tagProps[propName] = {};
     tagProps[propName].value = insideSingleQuotes;
     tagProps[propName].quoteType = "single";

     //Find start and end of single quotes
     let indexOfPropName = tagString.search(propName);
     let afterTagName = tagString.substring(indexOfPropName,tagString.length);
     let indexOfSingleQuote = afterTagName.search(`'`) + 1;
     let afterBeginningSingleQuote = afterTagName.substring(indexOfSingleQuote,afterTagName.length);
     let indexOfClosingSingleQuote = afterBeginningSingleQuote.search(`'`);
     tagProps[propName].indexOfStartQuote = indexOfPropName + indexOfSingleQuote + tagIndex + index;
     tagProps[propName].indexOfEndQuote = indexOfPropName + indexOfSingleQuote + indexOfClosingSingleQuote + tagIndex + index;
     

     tagPropsString = tagPropsString.substring(0,matchObj.index) +
     tagPropsString.substring(matchObj.index + matchObj[0].length +
       singleMatchObj[0].length,tagPropsString.length);

    }
  }


  //Process Unquoted Props
  if (/\S/.test(tagPropsString)) {
    let unquotedParts = tagPropsString.split(" ");
    for (let propName of unquotedParts){
      if (/\S/.test(propName)) {
        propName = propName.trim();
        tagProps[propName] = {};
        tagProps[propName].value = true;
        tagProps[propName].quoteType = "none";
        //Find index right after propname
        let indexOfPropName = tagString.search(propName);
        tagProps[propName].endPropNameIndex = indexOfPropName + propName.length + tagIndex + index;
      }
    }
  }
  
  return {tagString:tagString,tagType:tagType,tagIndex:tagIndex,tagProps:tagProps};
}

export default DoenetEditor;