import React from "react";
import { motion } from "framer-motion";
import { Bookmark } from "@/types";
import { NeonBorder } from "@/components/ui/neon-border";
import { cn, getIconBgColor } from "@/lib/utils";
import { FiGlobe } from "react-icons/fi";
import {
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaFigma,
  FaSpotify,
  FaReddit,
  FaDiscord,
  FaSlack,
  FaEnvelope,
  FaCodeBranch,
  FaNetworkWired,
} from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  "github": <FaGithub className="text-2xl text-white" />,
  "twitter": <FaTwitter className="text-2xl text-white" />,
  "youtube": <FaYoutube className="text-2xl text-white" />,
  "figma": <FaFigma className="text-2xl text-white" />,
  "spotify": <FaSpotify className="text-2xl text-white" />,
  "reddit": <FaReddit className="text-2xl text-white" />,
  "discord": <FaDiscord className="text-2xl text-white" />,
  "slack": <FaSlack className="text-2xl text-white" />,
  "gmail": <FaEnvelope className="text-2xl text-white" />,
  "code": <FaCodeBranch className="text-2xl text-white" />,
  "netflix": <FaNetworkWired className="text-2xl text-white" />,
  "default": <FiGlobe className="text-2xl text-white" />
};

interface BookmarkCardProps {
  bookmark: Bookmark;
  onClick: (url: string) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onClick }) => {
  const handleClick = () => {
    onClick(bookmark.url);
  };

  const icon = iconMap[bookmark.icon.toLowerCase()] || iconMap.default;
  const bgGradient = getIconBgColor(bookmark.category);

  return (
    <motion.div
      className="group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <NeonBorder className="rounded-xl bg-opacity-25 backdrop-blur-md bg-deep-purple">
        <div className="p-4 flex flex-col items-center h-full">
          <motion.div
            className={cn(
              "mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br",
              bgGradient
            )}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-center text-sm font-medium mb-1 transition-colors">{bookmark.name}</h3>
          <p className="text-text-secondary text-xs text-center">{bookmark.category}</p>
        </div>
      </NeonBorder>
    </motion.div>
  );
};

export default BookmarkCard;
