const data = {abc: "abc", def: "def"};

const js = data +  {access_to: {patient: ["abc", "def"], organisation: ["abc", "def"], professional: ["abc", "def"]}};

console.log(JSON.stringify(data));
console.log(JSON.stringify(js));
console.log(js);