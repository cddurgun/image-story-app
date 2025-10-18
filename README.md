# ImageStory AI - Real-time Story Generation

A modern, minimalist web application for creating AI-generated image stories using NVIDIA's FLUX.1-dev model. Features flexible manual and automatic image generation modes.

## Features

- **Flexible Generation Modes**: Choose between manual generation or auto-generate as you type
- **Story Management**: Create, view, and manage multiple image stories
- **Modern UI**: Built with Next.js 15, Tailwind CSS, and shadcn/ui components
- **Customizable Settings**: Adjust image generation parameters (width, height, guidance scale, inference steps)
- **Local Storage**: All data persists in browser's localStorage
- **Environment Variables**: Secure API key management via .env.local
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **AI Model**: FLUX.1-schnell via Together AI (Free unlimited access for 3 months!)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- NVIDIA API key (get one at [build.nvidia.com](https://build.nvidia.com))

### Installation

1. Clone the repository:
```bash
cd image-story-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Configuration

1. Create a `.env.local` file in the root directory (or update the existing one):
```bash
TOGETHER_API_KEY=your-together-ai-api-key-here
```

2. Get your FREE Together AI API key:
   - Sign up at [api.together.xyz](https://api.together.xyz/signup)
   - Get 3 months of unlimited free access to FLUX.1-schnell!
   - Copy your API key from the dashboard

3. Restart the development server to load the new environment variables

## Pages

### Dashboard
- View statistics (total stories, images, recent activity)
- Quick access to recent stories
- Create new stories

### Create Story
- **Auto-Generate Toggle**: Enable/disable automatic image generation as you type
- Enter story title and description
- Type prompts to generate images
- **Manual Mode** (default): Click "Generate Now" button to create images
- **Auto Mode**: Images generate automatically 5 seconds after you stop typing
- Live preview of generated images
- Remove unwanted images
- Save stories with all generated images

### Storyboard
- View all created stories in grid or list view
- Click to view detailed story with all images
- Delete stories

### Profile
- Manage personal information (name, email)
- View API configuration information
- Note: API key is configured via `.env.local` file

### Settings
- Adjust image generation parameters:
  - Image width (512px - 2048px)
  - Image height (512px - 2048px)
  - Guidance scale (0 - 20)
  - Inference steps (1 - 50)
- Reset to default settings

## Project Structure

```
image-story-app/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # NVIDIA API integration
│   ├── create/
│   │   └── page.tsx              # Story creation page
│   ├── storyboard/
│   │   └── page.tsx              # Story gallery
│   ├── profile/
│   │   └── page.tsx              # User profile
│   ├── settings/
│   │   └── page.tsx              # App settings
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Dashboard
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   └── nav.tsx                   # Navigation component
├── lib/
│   ├── storage.ts                # localStorage utilities
│   └── utils.ts                  # Utility functions
└── types/
    └── index.ts                  # TypeScript type definitions
```

## API Integration

The app uses FLUX.1-schnell via Together AI's fast and reliable API:

- **Endpoint**: `https://api.together.xyz/v1/images/generations`
- **Authentication**: Bearer token (API key)
- **Model**: `black-forest-labs/FLUX.1-schnell-Free`
- **Speed**: Ultra-fast generation (~1 second per image!)
- **Response**: Base64 encoded images
- **Supported Resolutions**: Various resolutions (1024x768 default)
- **Free Tier**: Unlimited access for 3 months!

## Features in Detail

### Image Generation
- **Manual Mode** (default): Full control over when images are generated
- **Auto Mode**: Debounced generation (5 seconds after typing stops)
- Prevents duplicate generations and API spam
- Loading states and comprehensive error handling
- Real-time progress indicators

### Data Persistence
- Stories saved in localStorage
- Settings persist across sessions
- Profile information stored locally
- No backend required

### Image Settings
- **Width/Height**: Control output dimensions
- **Guidance Scale**: How closely to follow prompts
- **Inference Steps**: Balance between speed and quality

## Tips for Best Results

1. Use detailed, descriptive prompts
2. Start with default settings (1024x1024, 4 steps)
3. Increase inference steps for higher quality
4. Keep guidance scale at 0 for automatic optimization
5. Wait for generation to complete before typing new prompt

## Limitations

- Images are stored as base64 data URLs (may impact performance with many images)
- localStorage has ~5-10MB limit (varies by browser)
- API rate limits apply based on your NVIDIA plan
- Real-time generation requires stable internet connection

## Future Enhancements

- Backend storage for unlimited images
- Image editing and enhancement
- Story sharing and export
- Collaborative story creation
- Animation and video generation
- Custom model fine-tuning

## License

MIT

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by [Together AI](https://www.together.ai/) - FLUX.1-schnell
