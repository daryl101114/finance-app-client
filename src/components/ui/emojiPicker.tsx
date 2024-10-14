import {  ReactNode, Suspense, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />;

interface EmojiPickerPropType {
  children: ReactNode;
  setValueToParentCompnent: (data: string) => void;
}

const EmojiPicker = ({
  children,
  setValueToParentCompnent,
}: EmojiPickerPropType) => {
  const [selectedEmoji, setSelectedEmoji] = useState('hamburger');
  const [showEmoji, setShowEmoji] = useState(false);

  const addEmoji = (emoji: any) => {
    console.log(emoji);
    setSelectedEmoji(emoji.id); // Get the emoji character
    console.log(selectedEmoji);
    setValueToParentCompnent(emoji.id);
  };
  return (
    <>
      <div>
        <div
          onClick={() => {
            setShowEmoji(!showEmoji);
          }}
        >
          {children}
        </div>
        {showEmoji && (
          <Suspense fallback={fallback}>
            <div className="absolute">
              {' '}
              <Picker data={data} onEmojiSelect={addEmoji} />{' '}
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
};

export default EmojiPicker;
