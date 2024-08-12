class Emojify {
    constructor(options) {
      this.options = {
        emojis: options.emojis || ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤧', '😷', '🤒', '🤕', '🤯', '🤠', '🥳', '😛', '😜', '😝', '🤪', '🤩', '🥳', '🤖', '👽', '💩', '🎃', '👻', '🎃', '👻', '🕷️', '🕸️', '🐛', '🐜', '🐝', '🐞'],
        random: options.random !== undefined ? options.random : true,
        duration: options.duration || 500,
        delay: options.delay || 15,
        size: options.size || '48px',
        zIndex: options.zIndex || 9999,
        scaleOpacity: options.scaleOpacity !== undefined ? options.scaleOpacity : false,
      };
  
      this.prevX = 0;
      this.prevY = 0;
      this.lastEmojyCreationTime = 0;
  
      this.init();
    }
  
    init() {
      this.addCSS();
      document.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    }
  
  
    handleMouseMove(event) {
      const currentTime = new Date().getTime();
      if (currentTime - this.lastEmojyCreationTime >= this.options.delay) {
        const emoji = this.createEmoji(event.clientX, event.clientY);
        document.body.appendChild(emoji);
  
        const distance = Math.hypot(event.clientX - this.prevX, event.clientY - this.prevY);
        const scale = 1 + (distance / 100);
        emoji.style.transform = `scale(${scale})`;
        if (this.options.scaleOpacity) {
          emoji.style.opacity = 1 / scale;
        } else {
          emoji.style.opacity = 1;
        }
  
        this.prevX = event.clientX;
        this.prevY = event.clientY;
        this.lastEmojyCreationTime = currentTime;
  
        setTimeout(() => {
          emoji.style.transform = 'scale(0)';
          emoji.style.opacity = 0;
          setTimeout(() => document.body.removeChild(emoji), 500);
        }, this.options.duration);
      }
    }
  
    createEmoji(x, y) {
      const emoji = document.createElement('div');
      emoji.id = 'emojify';
      emoji.textContent = this.getEmoji();
      emoji.style.left = `${x}px`;
      emoji.style.top = `${y}px`;
      emoji.style.fontSize = this.options.size;
      emoji.style.zIndex = this.options.zIndex;
      return emoji;
    }
  
    getEmoji() {
      return this.options.random
        ? this.options.emojis[Math.floor(Math.random() * this.options.emojis.length)]
        : this.options.emojis[0];
    }
  
    addCSS() {
      const style = document.createElement('style');
      style.textContent = `
        #emojify {
          align-items: center;
          display: flex;
          text-align: center;
          justify-content: center;
          position: absolute;
          pointer-events: none;
          transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        }
      `;
      document.head.appendChild(style);
    }
}

window.emojify = new Emojify({});