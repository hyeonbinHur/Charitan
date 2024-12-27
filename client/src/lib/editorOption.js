export const editorConfig = {
  height: 500,
  plugins: ["image", "codesample"],
  toolbar:
    "undo redo | bold italic | alignleft aligncenter alignright | code image | codesample",
  codesample_global_prismjs: true,
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "TypeScript", value: "typescript" },
    { text: "JSX", value: "jsx" },
  ],
  automatic_uploads: true,
  setup: (editor) => {
    editor.on("init", () => {
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (
        type,
        listener,
        options
      ) {
        if (type === "touchstart" && typeof options === "object") {
          options.passive = true;
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });
  },
  file_picker_types: "image",
  file_picker_callback: function (callback, value, meta) {
    if (meta.filetype === "image") {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = function () {
        if (input.files) {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const result = e.target?.result;
            if (typeof result === "string") {
              callback(result, {
                alt: file.name,
              });
            } else {
              console.error("Failed to read file as base64 string");
            }
          };
          // 오류 처리: 파일 읽기 실패 시 처리
          reader.onerror = function () {
            console.error("Error reading file");
          };
          // 파일을 base64로 읽기
          reader.readAsDataURL(file);
        }
      };
    }
  },
};
