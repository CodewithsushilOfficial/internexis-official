import React from 'react';

interface ProjectImageDisplayProps {
  title: string;
  domain: string;
}

const ProjectImageDisplay: React.FC<ProjectImageDisplayProps> = ({ title, domain }) => {
  // Map project titles to relevant cybersecurity images
  const getImageUrl = (projectTitle: string): string => {
    // Default fallback image for any project that doesn't have a specific match
    let imageUrl = "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80";
    
    // Map specific project titles to relevant images
    if (domain === "cybersecurity") {
      if (projectTitle.includes("Password Strength")) {
        imageUrl = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
      } else if (projectTitle.includes("Network Scanner")) {
        imageUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80";
      } else if (projectTitle.includes("Encryption") || projectTitle.includes("Cryptography")) {
        imageUrl = "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80";
      } else if (projectTitle.includes("Phishing")) {
        imageUrl = "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
      } else if (projectTitle.includes("Firewall")) {
        imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
      } else if (projectTitle.includes("Vulnerability")) {
        imageUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
      } else if (projectTitle.includes("Malware")) {
        imageUrl = "https://images.unsplash.com/photo-1544890225-2f3faec4cd60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80";
      } else if (projectTitle.includes("Intrusion")) {
        imageUrl = "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80";
      }
    }
    
    return imageUrl;
  };

  const imageUrl = getImageUrl(title);

  return (
    <div className="aspect-video w-full rounded-t-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
        <h3 className="text-white text-xl font-bold text-center px-6">{title}</h3>
      </div>
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default ProjectImageDisplay;