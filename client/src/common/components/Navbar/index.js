import {
  BookmarkAltIcon,
  CalendarIcon,
  HomeIcon,
  PencilAltIcon,
  ShieldCheckIcon,
  SupportIcon,
  TagIcon,
} from "@heroicons/react/outline";

export const sideNavbarLinks = [
  {
    key: "home",
    name: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    key: "create",
    name: "Create",
    href: "/post/create",
    Icon: PencilAltIcon,
  },
  {
    key: "tags",
    name: "Tags",
    href: "/tags",
    Icon: TagIcon,
  },
];

export const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: SupportIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkAltIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
