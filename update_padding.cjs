const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const paddingRegex = /\b(py-\d+|pt-\d+|pb-\d+|md:pt-\d+|md:pb-\d+|md:py-\d+)\b/g;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let modified = false;
  
  // Find all <section> tags and replace padding in their className
  content = content.replace(/(<section[^>]*className=["'])([^"']*)(["'][^>]*>)/g, (match, prefix, classes, suffix) => {
    // replace padding classes with nothing
    let newClasses = classes.replace(paddingRegex, '').replace(/\s+/g, ' ').trim();
    // add py-[50px]
    newClasses = 'py-[50px] ' + newClasses;
    modified = true;
    return prefix + newClasses + suffix;
  });
  
  // If no <section> tag with className was found, we should check if there's a multiline <section className=...
  if (!modified && content.includes('<section')) {
    content = content.replace(/(<section[^>]*className=\{?["']?)([^"'\}>]*)(["']?\}?[^>]*>)/g, (match, prefix, classes, suffix) => {
      let newClasses = classes.replace(paddingRegex, '').replace(/\s+/g, ' ').trim();
      if (!classes.includes('py-[50px]')) {
         newClasses = 'py-[50px] ' + newClasses;
      }
      return prefix + newClasses + suffix;
    });
  }

  fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('Padding updated successfully.');
