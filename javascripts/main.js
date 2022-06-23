var input = document.createElement("input")
input.type = 'file';

document.body.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";

  this.style.background = '#e1e7f0';
}, false);

document.body.addEventListener('dragleave', function (e) {
  e.preventDefault();

  this.style.background = '#ffffff';
}, false);

compile = function (files) {
  document.body.style.pointerEvents = "none";

  if (files.length > 1) {
    return alert('Too much files');
  };

  var reader = new FileReader();
  reader.readAsText(files[0]);

  reader.onload = function () {
    marked.setOptions({
      langPrefix: '',
      highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
      }
    });

    workbench = document.createElement("pre")
    workbench.innerText = '<div class="markdown-body">\n' + marked.parse(reader.result) + '\n\n<style>' + styles.join('\n') + '</style>\n</div>'

    document.body.innerHTML = ""
    document.body.appendChild(workbench)
  };
};

document.body.addEventListener('click', function () {
  input.click();
});

input.addEventListener('input', function () {
  compile(input.files)
});

document.body.addEventListener('drop', function (e) {
  e.preventDefault();

  this.style.background = '#ffffff';

  compile(e.dataTransfer.files)
}, false);