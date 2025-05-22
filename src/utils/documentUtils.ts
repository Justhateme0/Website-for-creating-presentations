import mammoth from 'mammoth';

export const parseWordDocument = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        
        let markdown = '';
        const lines = text.split('\n');
        let isFirstTitle = true;
        let inList = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
          
          if (line === '') {
            if (inList) {
              inList = false;
              markdown += '\n';
            }
            markdown += '\n';
            continue;
          }

          if (isFirstTitle && line !== '') {
            markdown += `${line}\n\n`;
            isFirstTitle = false;
            continue;
          }

          const isHeading = (
            (line.length < 100 && nextLine === '') ||
            (line.length < 100 && !nextLine.startsWith('•') && !nextLine.startsWith('-'))
          );

          if (isHeading) {
            markdown += `\n${line}\n`;
            continue;
          }

          if (line.startsWith('•') || line.startsWith('-') || /^\d+[.)]/.test(line)) {
            const bulletPoint = line.replace(/^\d+[.)]/, '•').replace(/^[-]/, '•');
            markdown += `${bulletPoint}\n`;
            inList = true;
            continue;
          }

          markdown += `${line}\n`;
        }
        
        resolve(markdown.trim());
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsArrayBuffer(file);
  });
};