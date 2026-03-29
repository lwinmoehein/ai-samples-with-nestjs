import { Injectable, OnModuleInit } from '@nestjs/common';
import { pipeline, FeatureExtractionPipeline } from '@huggingface/transformers';

@Injectable()
export class EmbeddingService implements OnModuleInit {
  private extractor: FeatureExtractionPipeline;

  async onModuleInit() {
    // @ts-ignore
    this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  async generateVector(text: string): Promise<number[]> {
    const output = await this.extractor(text, {
      pooling: 'mean',
      normalize: true
    });

    // Returns the 384-dimensional array
    return Object.values(output.data);
  }
}