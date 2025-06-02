const fs = require('fs');
const path = require('path');

const oldThoughtsDir = path.join(__dirname, '../old_site/thoughts');
const newThoughtsDir = path.join(__dirname, '../content/thoughts');

// Ensure the new thoughts directory exists
if (!fs.existsSync(newThoughtsDir)) {
  fs.mkdirSync(newThoughtsDir, { recursive: true });
}

// Read all thought files
const thoughtFiles = fs.readdirSync(oldThoughtsDir).filter(file => file.endsWith('.txt'));

thoughtFiles.forEach(file => {
  const filePath = path.join(oldThoughtsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract title (first line) and body (rest of the content)
  const lines = content.split('\n');
  const title = lines[0].trim();
  const body = lines.slice(2).join('\n').trim(); // Skip empty line after title
  
  // Create slug from filename
  const slug = file.replace('.txt', '');
  
  // Get file stats for date
  const stats = fs.statSync(filePath);
  const date = stats.mtime.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Create markdown content with frontmatter
  const markdownContent = `---
title: "${title}"
date: "${date}"
---

${body}`;
  
  // Write to new markdown file
  const newFilePath = path.join(newThoughtsDir, `${slug}.md`);
  fs.writeFileSync(newFilePath, markdownContent);
  
  console.log(`Migrated: ${file} -> ${slug}.md`);
});

console.log(`\nMigrated ${thoughtFiles.length} thoughts successfully!`);