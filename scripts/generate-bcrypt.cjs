// Usage: node scripts/generate-bcrypt.cjs your_password
// Requires: npm install bcryptjs
const bcrypt = require('bcryptjs');

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node scripts/generate-bcrypt.cjs <password>');
  process.exit(1);
}

(async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    console.log(hash);
  } catch (e) {
    console.error('Error generating hash', e);
    process.exit(2);
  }
})();
