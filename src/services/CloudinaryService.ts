import { UploadService } from "@/integrations/supabase/services/upload";

interface UploadResult {
  url: string;
}

// Backward-compatible adapter kept to avoid breaking existing admin forms.
export class CloudinaryService {
  static async uploadImage(file: File, folder = "general"): Promise<UploadResult> {
    const url = await UploadService.uploadImage(file, folder);
    return { url };
  }

  static async uploadAudio(file: File, folder = "audio"): Promise<UploadResult> {
    const url = await UploadService.uploadAudio(file, folder);
    return { url };
  }

  static async uploadDocument(file: File, folder = "documents"): Promise<UploadResult> {
    const url = await UploadService.uploadDocument(file, folder);
    return { url };
  }
}
