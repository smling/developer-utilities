export class ClipBoardHelper {
    copyToClipboard(text) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text)
            .then(() => {
              console.log('Text copied to clipboard: ' + text);
            })
            .catch(err => {
              console.error('Unable to copy text to clipboard: ', err);
            });
        } else {
          // Fallback to the text area method if Clipboard API is not supported
          fallbackCopyToClipboard(text);
        }
    }
}