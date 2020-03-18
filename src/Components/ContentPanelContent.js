import React, { Component } from 'react';
import ContentPanel from './ContentPanel';

class ContentPanelContent extends Component {
  render() {
    return (
      <div>
         <ContentPanel>
           <div>DoenetML text</div>
           </ContentPanel>
           <ContentPanel>
             <div style={{ display: 'block', textAlign:'center'}}>
               <img src="https://picsum.photos/400/200" ></img>
             </div>
           </ContentPanel>
           <ContentPanel>
             <div>DoenetML Graph</div>
           </ContentPanel>
      </div>
    );
  }
}

export default ContentPanelContent;