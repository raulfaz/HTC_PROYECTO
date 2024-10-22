export interface Catalog {
    id: number;
    name: string;
    image_url?: string;
    pdf_url?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
    error?: any;
  }
  