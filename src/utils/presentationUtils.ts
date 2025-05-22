import pptxgen from 'pptxgenjs';
import { Slide } from '../components/PresentationCreator';

export const generateSlides = (text: string): Slide[] => {
  const lines = text.split('\n');
  const slides: Slide[] = [];
  let currentSlide: Slide | null = null;
  let currentContent: string[] = [];

  const finalizeSlide = () => {
    if (currentSlide && (currentContent.length > 0 || slides.length === 0)) {
      slides.push({
        ...currentSlide,
        content: [...currentContent]
      });
      currentContent = [];
    }
  };

  if (lines.length > 0) {
    currentSlide = {
      id: 'slide-1',
      title: lines[0].trim(),
      content: []
    };
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === '') {
      if (currentContent.length > 0) {
        finalizeSlide();
        currentSlide = null;
      }
      continue;
    }

    if (!currentSlide) {
      currentSlide = {
        id: `slide-${slides.length + 1}`,
        title: line,
        content: []
      };
      continue;
    }

    currentContent.push(line);
  }

  finalizeSlide();

  return slides;
};

export const generatePptx = async (slides: Slide[], theme: string, text: string): Promise<void> => {
  const pres = new pptxgen();

  pres.author = 'SlideGenius';
  pres.company = 'SlideGenius';
  pres.revision = '1';
  pres.subject = 'Презентация';
  pres.title = slides[0]?.title || 'Презентация';

  const themes = {
    default: {
      background: { color: 'FFFFFF' },
      title: { color: '000000', fontSize: 44, fontFace: 'Arial', bold: true },
      body: { color: '333333', fontSize: 24, fontFace: 'Arial' }
    },
    dark: {
      background: { color: '1F2937' },
      title: { color: 'FFFFFF', fontSize: 44, fontFace: 'Arial', bold: true },
      body: { color: 'E5E7EB', fontSize: 24, fontFace: 'Arial' }
    },
    gradient: {
      background: { color: '3B82F6' },
      title: { color: 'FFFFFF', fontSize: 44, fontFace: 'Arial', bold: true },
      body: { color: 'FFFFFF', fontSize: 24, fontFace: 'Arial' }
    },
    professional: {
      background: { color: 'EFF6FF' },
      title: { color: '1E3A8A', fontSize: 44, fontFace: 'Arial', bold: true },
      body: { color: '1E3A8A', fontSize: 24, fontFace: 'Arial' }
    },
    minimal: {
      background: { color: 'FFFFFF' },
      title: { color: '333333', fontSize: 44, fontFace: 'Arial', bold: true },
      body: { color: '666666', fontSize: 24, fontFace: 'Arial' }
    }
  };

  const currentTheme = themes[theme as keyof typeof themes] || themes.default;

  slides.forEach((slide, index) => {
    const pptxSlide = pres.addSlide();
    
    pptxSlide.background = { color: currentTheme.background.color };
    
    pptxSlide.addText(slide.title, {
      x: '5%',
      y: '5%',
      w: '90%',
      h: '15%',
      ...currentTheme.title,
      align: 'left',
      valign: 'middle'
    });
    
    if (slide.content.length > 0) {
      const contentText = slide.content.map(item => {
        if (item.startsWith('•') || item.startsWith('-')) {
          return { text: item.substring(1).trim(), options: { bullet: true } };
        }
        return { text: item, options: {} };
      });

      pptxSlide.addText(contentText, {
        x: '5%',
        y: '25%',
        w: '90%',
        h: '70%',
        ...currentTheme.body,
        align: 'left',
        valign: 'top',
        breakLine: true
      });
    }
  });

  await pres.writeFile({ fileName: 'писюнчики.pptx' });
};