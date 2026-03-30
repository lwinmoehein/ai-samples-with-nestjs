import { Injectable } from '@nestjs/common';
import { pipeline, RawImage } from '@huggingface/transformers';

@Injectable()
export class EmbeddingService {
  private extractor : any
  private imageExtractor:any

  async initTextModel() {
    if (!this.extractor) {
      this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
  }

  async initImageModel(){
    if(!this.imageExtractor){
      this.imageExtractor = await pipeline(
        'image-feature-extraction',
        'Xenova/clip-vit-base-patch32'
      );
    }
  }

  async generateVector(text: string): Promise<number[]> {
    await this.initTextModel();

    const output = await this.extractor(text, {
      pooling: 'mean',
      normalize: true
    });

    // Returns the 384-dimensional array
    return Object.values(output.data);
  }

  async generateImageVector(image: Express.Multer.File): Promise<number[]> {
    if (!image?.path) {
      throw new Error("Image path missing");
    }

    await this.initImageModel();

    const output = await this.imageExtractor(image.path, {
      pooling: 'mean',
      normalize: true
    });

    return Array.from(output.data);
  }
}