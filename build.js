const fs = require('fs');

const key = process.env.WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';

const content = `// Auto-generated at build time — do not edit manually
const CONFIG = {
    WEB3FORMS_KEY: "${key}"
};
`;

fs.writeFileSync('js/config.js', content);
