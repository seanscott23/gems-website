import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AudioModalRipper } from "../modal/AudioModalRipper";

const longAudioClipModal = () => {
  const { rssFeedUrl, success } = useSelector((state: RootState) => state.auth);
const [isModalOpen, setModalState] = React.useState(false);
  const audioClipsTooLong = () => {
    const audioItems: Array<object> = [];
    const allItems = rssFeedUrl.items;
    allItems.map(async (currentItem: any) => {
      if (parseInt(currentItem.itunes.duration) > 600) {
        audioItems.push(currentItem);
      }
    });
    return audioItems;
  };

  // When/where do you want to returnModal? on click of toggle modal in the return html component.
  // Gotcha
  const returnModal = (num: number) => {
    const items = audioClipsTooLong();
   
     return(  <AudioModalRipper
          show={isModalOpen}
          handleClose={handleClose}
          title={items[num].title}
          url={items[num].enclosure.url}
          id={i}
        ></AudioModalRipper>)
    
  // Your ripper is a modal and you're passing the show from multiple places. yes 
  // Can I edit some code with comments and stuff
};

export default longAudioClipModal;
