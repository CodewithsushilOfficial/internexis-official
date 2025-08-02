import React from "react";
import { Github } from "lucide-react";

interface SecureYouTubeEmbedProps {
  videoUrl: string;
  title: string;
  resources?: string[];
}

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
  let videoId = "";

  // Handle youtu.be short links
  if (url.includes("youtu.be/")) {
    const urlParts = url.split("youtu.be/");
    if (urlParts.length > 1) {
      videoId = urlParts[1].split("?")[0];
    }
  }
  // Handle youtube.com/embed links
  else if (url.includes("youtube.com/embed/")) {
    const urlParts = url.split("youtube.com/embed/");
    if (urlParts.length > 1) {
      videoId = urlParts[1].split("?")[0];
    }
  }
  // Handle standard youtube.com links
  else if (url.includes("youtube.com/watch")) {
    try {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v") || "";
    } catch {
      console.error("Invalid YouTube URL:", url);
    }
  }
  // Handle direct video ID
  else if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
    videoId = url;
  }

  return videoId;
};

const SecureYouTubeEmbed: React.FC<SecureYouTubeEmbedProps> = ({
  videoUrl,
  title,
  resources,
}) => {
  const videoId = getYouTubeVideoId(videoUrl);

  // Simplified embed URL with essential privacy parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0`;

  // Extract GitHub URL from resources if available
  const getGitHubUrl = () => {
    if (!resources || resources.length === 0) return null;

    const sourceCodeResource = resources.find(
      (resource) =>
        resource.toLowerCase().includes("source code") &&
        resource.toLowerCase().includes("github.com"),
    );

    if (sourceCodeResource) {
      const urlMatch = sourceCodeResource.match(/https?:\/\/[^\s]+/g);
      return urlMatch ? urlMatch[0] : null;
    }

    return null;
  };

  const githubUrl = getGitHubUrl();

  if (!videoId && !githubUrl) {
    return (
      <div className="aspect-video w-full rounded-t-2xl overflow-hidden relative bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No video or source code available</p>
      </div>
    );
  }

  if (!videoId) {
    return (
      <div className="aspect-video w-full rounded-t-2xl overflow-hidden relative bg-gray-200 flex items-center justify-center flex-col gap-4">
        <p className="text-gray-700 font-medium">
          Video tutorial not available
        </p>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <Github size={20} />
            View Source Code
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-t-2xl overflow-hidden relative">
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={embedUrl}
          title={title || "YouTube video player"}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-black bg-opacity-75 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm font-medium"
        >
          <Github size={16} />
          Source Code
        </a>
      )}
    </div>
  );
};

export default SecureYouTubeEmbed;
