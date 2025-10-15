import { useState, useEffect, useRef } from 'react';

// Lazy-load transformers in the browser to avoid breaking the app if the lib or model can't load
// We keep all AI features optional. If loading fails, we fall back to handcrafted explanations.
let transformers: any = null;

interface AIExplanation {
  summary: string;
  technicalDetails: string;
  userImpact: string;
  actionableSteps: string[];
  loading: boolean;
  error: string | null;
}

export const useAccessibilityAI = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const generatorRef = useRef<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Dynamically import to avoid breaking SSR/browsers without support
        const mod = await import('@huggingface/transformers');
        transformers = mod;
        const { pipeline, env } = mod as any;
        // Configure transformers to use remote browser-friendly models
        env.allowLocalModels = false;
        env.allowRemoteModels = true;

        // Use a lightweight text generation model, fallback is handled below
        generatorRef.current = await pipeline(
          'text-generation',
          'onnx-community/Qwen2.5-0.5B-Instruct',
          {
            device: 'webgpu',
            // Fallback to wasm/CPU automatically handled by the lib when WebGPU isn't available
            dtype: 'q4',
          }
        );
        setIsModelLoaded(true);
      } catch (error) {
        console.warn('AI model optional load failed; falling back to heuristics.', error);
        // Model loading failed, we'll use fallback explanations
        setIsModelLoaded(false);
      }
    };

    loadModel();
  }, []);

  const generateExplanation = async (
    ratio: number,
    textColor: string,
    bgColor: string,
    context: 'button' | 'text' | 'heading' | 'general' = 'general'
  ): Promise<AIExplanation> => {
    const defaultExplanation: AIExplanation = {
      summary: getFallbackSummary(ratio),
      technicalDetails: getFallbackTechnicalDetails(ratio),
      userImpact: getFallbackUserImpact(ratio),
      actionableSteps: getFallbackActionableSteps(ratio, textColor, bgColor),
      loading: false,
      error: null
    };

    // If model isn't loaded, return fallback
    if (!isModelLoaded || !generatorRef.current) {
      return defaultExplanation;
    }

    try {
      const prompt = `You are an accessibility expert. Analyze this color contrast:

Contrast Ratio: ${ratio.toFixed(2)}:1
Text Color: ${textColor}
Background Color: ${bgColor}
Context: ${context}

WCAG Standards:
- AA Normal Text: 4.5:1
- AA Large Text: 3:1
- AAA Normal Text: 7:1
- AAA Large Text: 4.5:1

Provide a brief, actionable explanation in this format:
1. One sentence summary of the accessibility status
2. Technical reason why it passes/fails
3. Impact on users (one sentence)
4. One specific action to improve or maintain accessibility

Keep it under 100 words total.`;

      const result = await generatorRef.current(prompt, {
        max_new_tokens: 150,
        temperature: 0.7,
        top_k: 50,
        do_sample: true
      });

      const generatedText = result[0].generated_text;
      
      // Parse the AI response (simple parsing, can be enhanced)
      const lines = generatedText.split('\n').filter((line: string) => line.trim());
      
      return {
        summary: lines[0] || defaultExplanation.summary,
        technicalDetails: lines[1] || defaultExplanation.technicalDetails,
        userImpact: lines[2] || defaultExplanation.userImpact,
        actionableSteps: lines.slice(3) || defaultExplanation.actionableSteps,
        loading: false,
        error: null
      };
    } catch (error) {
      console.error('AI generation error:', error);
      return {
        ...defaultExplanation,
        error: 'AI generation failed, showing standard explanation'
      };
    }
  };

  return {
    generateExplanation,
    isModelLoaded
  };
};

// Fallback functions for when AI model isn't available
const getFallbackSummary = (ratio: number): string => {
  if (ratio >= 7) return '✅ Excellent contrast - exceeds all WCAG standards';
  if (ratio >= 4.5) return '✓ Good contrast - meets WCAG AA standards';
  if (ratio >= 3) return '⚠️ Minimal contrast - only passes for large text';
  return '❌ Poor contrast - fails accessibility standards';
};

const getFallbackTechnicalDetails = (ratio: number): string => {
  if (ratio >= 7) {
    return `Contrast ratio of ${ratio.toFixed(2)}:1 exceeds AAA level requirements (7:1 for normal text, 4.5:1 for large text).`;
  }
  if (ratio >= 4.5) {
    return `Contrast ratio of ${ratio.toFixed(2)}:1 meets AA level requirements (4.5:1 for normal text) and AAA for large text.`;
  }
  if (ratio >= 3) {
    return `Contrast ratio of ${ratio.toFixed(2)}:1 only meets AA for large text (3:1 minimum), but fails for normal text.`;
  }
  return `Contrast ratio of ${ratio.toFixed(2)}:1 fails all WCAG requirements. Minimum standards are 3:1 for large text and 4.5:1 for normal text.`;
};

const getFallbackUserImpact = (ratio: number): string => {
  if (ratio >= 7) {
    return 'Users with visual impairments, color blindness, or viewing in bright sunlight will have excellent readability.';
  }
  if (ratio >= 4.5) {
    return 'Most users will have good readability, though users with severe visual impairments may still face challenges.';
  }
  if (ratio >= 3) {
    return 'Users with low vision or viewing in poor lighting will struggle with normal-sized text.';
  }
  return 'Many users, especially those with visual impairments, will be unable to read this text.';
};

const getFallbackActionableSteps = (ratio: number, textColor: string, bgColor: string): string[] => {
  if (ratio >= 7) {
    return ['Your colors are already highly accessible - no changes needed!'];
  }
  if (ratio >= 4.5) {
    return [
      'Consider increasing contrast to 7:1 for AAA compliance',
      'Test with actual users who have visual impairments',
      'Ensure consistency across all similar components'
    ];
  }
  
  const steps = ['Increase contrast to at least 4.5:1 (AA standard)'];
  
  // Analyze colors and give specific suggestions
  const bgIsLight = bgColor.toLowerCase().includes('fff') || bgColor.toLowerCase().includes('f5f5');
  const textIsLight = textColor.toLowerCase().includes('fff') || textColor.toLowerCase().includes('f5f5');
  
  if (bgIsLight && !textIsLight) {
    steps.push('Try using a darker text color like #000000 or #1A1A1A');
  } else if (!bgIsLight && textIsLight) {
    steps.push('Try using a lighter text color like #FFFFFF or #F5F5F5');
  } else if (bgIsLight && textIsLight) {
    steps.push('Use dark text (#000000) on this light background');
  } else {
    steps.push('Use light text (#FFFFFF) on this dark background');
  }
  
  steps.push('Test in different lighting conditions and devices');
  
  return steps;
};
