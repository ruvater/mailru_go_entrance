const fs = require('fs')

const fileName = process.argv[2] || ''

if (!fileName.length) {
  process.stderr.write('Filename is not specified\n')
  process.exit(1)
}

let lineCount = 0

fs.createReadStream(process.argv[2])
  .on('data', function(dataChunk) {
    for (let char of dataChunk) {
      if (char === '\n'.charCodeAt()) {
        lineCount++
      }
    }
  }).on('end', function() {
    process.stdout.write(`${lineCount}\n`)
    process.exit(0)
  }).on('error', function(err) {
    process.stderr.write(`${err}\n`)
    process.exit(1)
  });
