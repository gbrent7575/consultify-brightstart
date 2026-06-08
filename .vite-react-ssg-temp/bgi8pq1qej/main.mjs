import { ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { useState, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Calendar, Phone, ChevronDown, Menu, ArrowRight, Clock, ShieldCheck, FileCheck, DollarSign, HeadphonesIcon, AlertTriangle, Check, Shield, Users, Award, ChevronUp, Mail, MapPin, CheckCircle2, TrendingUp, FileText, AlertCircle, ClipboardCheck, Camera, BookOpen, Wrench, Info, Upload, RefreshCw, ClipboardList, CalendarClock } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Helmet } from "react-helmet-async";
import { Slot } from "@radix-ui/react-slot";
import * as SelectPrimitive from "@radix-ui/react-select";
import { z } from "zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const queryClient = new QueryClient();
const App = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsx(Outlet, {})
] }) });
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const trackBookConsultation = () => {
  var _a;
  (_a = window.gtag) == null ? void 0 : _a.call(window, "event", "book_consultation_click", {
    event_category: "conversion",
    event_label: "cal_com_booking",
    value: 1
  });
};
const trackQuoteFormSubmission = (platforms, source_page) => {
  var _a;
  (_a = window.gtag) == null ? void 0 : _a.call(window, "event", "quote_form_submission", {
    platforms,
    source_page
  });
};
const trackPhoneClick = () => {
  var _a;
  (_a = window.gtag) == null ? void 0 : _a.call(window, "event", "phone_click", {
    event_category: "conversion",
    event_label: "phone_call",
    value: 1
  });
};
const trackGetStartedClick = () => {
  var _a;
  (_a = window.gtag) == null ? void 0 : _a.call(window, "event", "get_started_click", {
    event_category: "conversion",
    event_label: "setup_interest",
    value: 1
  });
};
const CAL_LINK$5 = "https://cal.com/garland-brent-wa1zbs/15min";
const NavigationNew = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };
  const services = [
    { name: "Digital Compliance Management", path: "/services/compliance-platforms" },
    { name: "Safety Program Development", path: "/services/safety-program-development" },
    { name: "Regulatory Compliance Support", path: "/services/regulatory-compliance" },
    { name: "Onsite Audits & Training", path: "/services/onsite-audits-training" },
    { name: "Risk Consulting", path: "/services/risk-consulting" },
    { name: "Safety Management System (SMS)", path: "/services/safety-management-system" },
    { name: "Monthly Training Packages", path: "/services/monthly-training" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 w-full bg-accent text-accent-foreground z-50 py-2 px-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-center gap-4 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Need ISNetworld®, Veriforce® or Avetta® Compliance Help?" }),
      /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Need Compliance Help?" }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: CAL_LINK$5,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: trackBookConsultation,
          className: "inline-flex items-center gap-1 text-xs text-accent-foreground hover:underline",
          children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
            "Book Free Consult"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:601-647-1201",
          onClick: trackPhoneClick,
          className: "hidden md:flex items-center gap-1 hover:underline",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }),
            "601-647-1201"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("nav", { className: `fixed top-10 w-full z-40 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"}`, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: `text-xl md:text-2xl font-serif font-bold transition-colors ${scrolled ? "text-primary" : "text-primary-foreground md:text-primary"} hover:opacity-80`,
            children: "Cornerstone Risk Management"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative",
              onMouseEnter: () => setServicesDropdownOpen(true),
              onMouseLeave: () => setServicesDropdownOpen(false),
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: `flex items-center gap-1 font-medium transition-colors ${scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground md:text-foreground md:hover:text-primary"}`,
                    children: [
                      "Services",
                      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
                    ]
                  }
                ),
                servicesDropdownOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 pt-2 z-50", children: /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-lg shadow-lg py-2 min-w-[280px]", children: services.map((service) => /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: service.path,
                    className: "block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                    children: service.name
                  },
                  service.path
                )) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollToSection("pricing"),
              className: `font-medium transition-colors ${scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground md:text-foreground md:hover:text-primary"}`,
              children: "Pricing"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/about",
              className: `font-medium transition-colors ${scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground md:text-foreground md:hover:text-primary"}`,
              children: "About"
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: CAL_LINK$5,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: trackBookConsultation,
              className: `inline-flex items-center gap-1 font-medium transition-colors ${scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground md:text-foreground md:hover:text-primary"}`,
              children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
                "Free Consultation"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground md:text-foreground"}`,
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
          }
        )
      ] }),
      mobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden mt-4 pb-4 space-y-3 animate-slide-up bg-background rounded-lg p-4 shadow-lg", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setMobileServicesOpen(!mobileServicesOpen),
              className: "flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors font-medium",
              children: [
                "Services",
                /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}` })
              ]
            }
          ),
          mobileServicesOpen && /* @__PURE__ */ jsx("div", { className: "pl-4 mt-2 space-y-2 border-l-2 border-accent/20", children: services.map((service) => /* @__PURE__ */ jsx(
            Link,
            {
              to: service.path,
              onClick: () => setMobileMenuOpen(false),
              className: "block py-2 text-sm text-foreground hover:text-primary transition-colors",
              children: service.name
            },
            service.path
          )) })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollToSection("pricing"),
            className: "block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium",
            children: "Pricing"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/about",
            onClick: () => setMobileMenuOpen(false),
            className: "block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium",
            children: "About"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 space-y-3 border-t border-border", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              asChild: true,
              className: "w-full bg-accent text-accent-foreground hover:bg-accent/90",
              children: /* @__PURE__ */ jsxs("a", { href: CAL_LINK$5, target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "mr-2 h-4 w-4" }),
                "Book Free Consultation"
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:601-647-1201",
              className: "flex items-center justify-center gap-2 py-2 text-primary font-medium",
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
                "Call: 601-647-1201"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
const heroImage$7 = "/assets/hero-option-1-oilfield-CZiJOQJc.jpg";
const CAL_LINK$4 = "https://cal.com/garland-brent-wa1zbs/15min";
const HeroNew = () => {
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs("header", { role: "banner", className: "relative min-h-[90vh] flex items-center overflow-hidden", "aria-label": "Hero section", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: heroImage$7,
          alt: "Oil and gas contractor compliance support",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-24 md:py-32 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-6", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-primary-foreground/90 font-medium", children: "99% Compliance Success Rate" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 leading-tight", children: "Need Help with ISNetworld® or Avetta® Compliance? We Provide Support So You Can Get Back to Work." }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed", children: "Complete setup, maintenance, and ongoing compliance support services — with a 99% success rate. Stop losing contracts over paperwork." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            size: "lg",
            onClick: scrollToForm,
            className: "bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all",
            children: [
              "Request a Quote",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            asChild: true,
            className: "border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent",
            children: /* @__PURE__ */ jsxs("a", { href: CAL_LINK$4, target: "_blank", rel: "noopener noreferrer", onClick: trackBookConsultation, children: [
              /* @__PURE__ */ jsx(Calendar, { className: "mr-2 h-4 w-4" }),
              "Book Free Consultation"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:601-647-1201",
          onClick: trackPhoneClick,
          className: "inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors md:hidden",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Call Now: 601-647-1201" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-8 border-t border-primary-foreground/20", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/70 mb-3", children: "Platforms we manage:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: ["ISNetworld®", "Avetta®", "Veriforce®", "PEC®", "BROWZ®"].map((platform) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-3 py-1.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-sm text-primary-foreground font-medium",
            children: platform
          },
          platform
        )) })
      ] })
    ] }) })
  ] });
};
const benefits = [
  {
    icon: Clock,
    title: "Save Hours of Admin Time",
    description: "Stop wrestling with complex questionnaires and document uploads. We handle all the paperwork."
  },
  {
    icon: ShieldCheck,
    title: "Avoid Rejections & Failed Audits",
    description: "Our 99% success rate means you stay approved and avoid costly compliance failures."
  },
  {
    icon: FileCheck,
    title: "Stay Eligible for Contracts",
    description: "Never lose a bid because of compliance issues. We keep your accounts in the green."
  },
  {
    icon: DollarSign,
    title: "Flat, Predictable Pricing",
    description: "No hourly billing surprises. Know exactly what you'll pay each month."
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Direct access to compliance professionals who understand your industry."
  },
  {
    icon: AlertTriangle,
    title: "Proactive Issue Resolution",
    description: "We catch and fix problems before they affect your approval status."
  }
];
const BenefitsSection = () => {
  return /* @__PURE__ */ jsx("section", { id: "benefits", className: "py-20 md:py-24 bg-background", "aria-labelledby": "benefits-heading", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-fade-in", children: [
      /* @__PURE__ */ jsx("h2", { id: "benefits-heading", className: "text-3xl md:text-4xl font-serif font-bold text-primary mb-4", children: "Why Contractors Choose Us" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Focus on your operations. We'll handle the compliance headaches." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto", children: benefits.map((benefit, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex gap-4 animate-slide-up",
        style: { animationDelay: `${index * 0.1}s` },
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(benefit.icon, { className: "h-6 w-6 text-accent" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-primary mb-2", children: benefit.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: benefit.description })
          ] })
        ]
      },
      benefit.title
    )) })
  ] }) });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const setupFeatures = [
  "New platform setup or remediation of an existing account",
  "Upload of insurance certificates",
  "Upload of up to 20 safety programs (template-based)",
  "Questionnaire completion with client-provided input",
  "Submission and correction of reviewer feedback until compliant"
];
const singleFeatures = [
  "Maintenance of one compliance platform",
  "Monthly data collection and uploads",
  "Quarterly hours and incident reporting",
  "Annual OSHA log uploads",
  "Insurance certificate renewals",
  "Routine corrections and client requirement updates"
];
const dualFeatures = [
  "Maintenance of two platforms (typically ISNetworld® + Veriforce®)",
  "All monthly, quarterly, and annual reporting cycles",
  "Client-specific requirement changes",
  "Routine issue resolution"
];
const multiFeatures = [
  "Maintenance of up to three platforms",
  "All recurring reporting and updates",
  "Priority response for issue resolution"
];
const PricingSection = () => {
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "pricing", className: "py-20 md:py-24 bg-background", "aria-labelledby": "pricing-heading", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-fade-in", children: [
      /* @__PURE__ */ jsx("h2", { id: "pricing-heading", className: "text-3xl md:text-4xl font-serif font-bold text-primary mb-4", children: "Simple, Flat-Rate Pricing" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "No surprises. No hourly billing. Just predictable costs for complete compliance management." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs(Card, { className: "border-2 border-border hover:border-accent/50 transition-colors animate-slide-up", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsx(CardDescription, { className: "text-accent font-semibold uppercase tracking-wide text-sm", children: "One-Time" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-serif", children: "Platform Setup or Reset" }),
          /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold", children: "$900" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-base font-normal", children: " /platform" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "$1,600 for two platforms together" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: setupFeatures.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-accent flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground text-sm", children: item })
          ] }, item)) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => {
                scrollToForm();
                trackGetStartedClick();
              },
              className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
              children: [
                "Get a Quote",
                /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-2 border-border hover:border-accent/50 transition-colors animate-slide-up", style: { animationDelay: "0.05s" }, children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsx(CardDescription, { className: "text-accent font-semibold uppercase tracking-wide text-sm", children: "Monthly" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-serif", children: "Single-Platform Maintenance" }),
          /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold", children: "$250" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-base font-normal", children: " /month" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "$3,000/year" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: singleFeatures.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-accent flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground text-sm", children: item })
          ] }, item)) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: scrollToForm,
              className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
              children: [
                "Get a Quote",
                /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-2 border-accent bg-accent/5 animate-slide-up relative overflow-hidden", style: { animationDelay: "0.1s" }, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg", children: "MOST POPULAR" }),
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsx(CardDescription, { className: "text-accent font-semibold uppercase tracking-wide text-sm", children: "Monthly — Most Common" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-serif", children: "Dual-Platform Maintenance" }),
          /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold", children: "$300" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-base font-normal", children: " /month" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "$3,600/year" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: dualFeatures.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-accent flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground text-sm", children: item })
          ] }, item)) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: scrollToForm,
              className: "w-full bg-accent text-accent-foreground hover:bg-accent/90",
              children: [
                "Get a Quote",
                /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-2 border-border hover:border-accent/50 transition-colors animate-slide-up", style: { animationDelay: "0.15s" }, children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsx(CardDescription, { className: "text-accent font-semibold uppercase tracking-wide text-sm", children: "Monthly" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-serif", children: "Multi-Platform Maintenance" }),
          /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold", children: "$350" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-base font-normal", children: " /month" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "$4,200/year" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: multiFeatures.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-accent flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground text-sm", children: item })
          ] }, item)) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: scrollToForm,
              className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
              children: [
                "Get a Quote",
                /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto mt-12 text-sm text-muted-foreground space-y-2", children: [
      /* @__PURE__ */ jsx("p", { children: "Monthly maintenance requires the platform to be compliant at start. Platforms needing significant fixes must complete Setup first." }),
      /* @__PURE__ */ jsx("p", { children: "New clients only — existing clients keep current pricing." }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Not included:" }),
        " DOT compliance, custom safety program writing, multi-entity restructuring."
      ] })
    ] })
  ] }) });
};
const stats = [
  {
    icon: Shield,
    value: "99%",
    label: "Compliance Success Rate",
    description: "Our clients stay approved"
  },
  {
    icon: Users,
    value: "100+",
    label: "Contractors Managed",
    description: "Across the Gulf Coast & beyond"
  },
  {
    icon: Clock,
    value: "15+",
    label: "Years Experience",
    description: "In contractor compliance"
  },
  {
    icon: Award,
    value: "24hr",
    label: "Response Time",
    description: "For urgent compliance issues"
  }
];
const testimonials = [
  {
    quote: "Cornerstone took over our ISNetworld account and we went from red flags to fully approved in two weeks. They handle everything now — I haven't logged in once this year.",
    author: "Operations Manager",
    company: "Gulf Coast Welding Services"
  },
  {
    quote: "We were losing bids because of compliance issues. Now we're approved on three platforms and winning more work than ever. Best investment we've made.",
    author: "Owner",
    company: "Industrial Maintenance Contractor"
  },
  {
    quote: "The monthly maintenance is worth every penny. They catch expiring documents before they become problems and keep us in the green.",
    author: "Safety Director",
    company: "Pipeline Services Company"
  }
];
const TrustSection = () => {
  return /* @__PURE__ */ jsx("section", { id: "trust", className: "py-20 md:py-24 bg-secondary/30", "aria-labelledby": "trust-heading", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 mb-16", children: stats.map((stat, index) => /* @__PURE__ */ jsx(
      Card,
      {
        className: "border-border text-center animate-slide-up",
        style: { animationDelay: `${index * 0.1}s` },
        children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(stat.icon, { className: "h-6 w-6 text-accent" }) }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-bold text-primary mb-1", children: stat.value }),
          /* @__PURE__ */ jsx("div", { className: "font-medium text-foreground mb-1", children: stat.label }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: stat.description })
        ] })
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { id: "trust-heading", className: "text-3xl md:text-4xl font-serif font-bold text-primary mb-4", children: "What Our Clients Say" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Real results from real contractors" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx(
      Card,
      {
        className: "border-border animate-slide-up",
        style: { animationDelay: `${index * 0.15}s` },
        children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-accent text-4xl font-serif mb-4", children: '"' }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground leading-relaxed mb-6", children: testimonial.quote }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-primary", children: testimonial.author }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: testimonial.company })
          ] })
        ] })
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Trusted by contractors working with:" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 max-w-3xl mx-auto", children: [
        "Major Refineries",
        "Chemical Plants",
        "Pipeline Companies",
        "Energy Producers",
        "Industrial Facilities"
      ].map((client) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "px-4 py-2 bg-background border border-border rounded-md text-sm text-muted-foreground",
          children: client
        },
        client
      )) })
    ] })
  ] }) });
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const noop = () => {
  throw new Error("Supabase client unavailable during SSR/SSG");
};
const supabase = new Proxy(
  {},
  {
    get() {
      return noop;
    }
  }
);
const CAL_LINK$3 = "https://cal.com/garland-brent-wa1zbs/15min";
const leadSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  company: z.string().trim().min(1, { message: "Company is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().min(1, { message: "Phone is required" }).max(20),
  platforms: z.string().min(1, { message: "Please select platforms needed" })
});
const PLATFORM_LABELS = {
  isnetworld: "ISNetworld",
  avetta: "Avetta",
  veriforce: "Veriforce",
  pec: "PEC Premier",
  browz: "BROWZ",
  multiple: "Multiple",
  "not-sure": "Other"
};
const LeadForm = () => {
  const { toast: toast2 } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    platforms: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      leadSchema.parse(formData);
      setIsSubmitting(true);
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `Phone: ${formData.phone}
Platforms Needed: ${formData.platforms}`
        }
      });
      if (error) throw error;
      toast2({
        title: "Request received!",
        description: "We'll contact you within 24 hours with a quote."
      });
      trackQuoteFormSubmission(PLATFORM_LABELS[formData.platforms] ?? "Other", "home");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        platforms: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast2({
          title: "Please fill in all fields",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        console.error("Error sending lead:", error);
        toast2({
          title: "Error submitting request",
          description: "Please try again or call us at 601-647-1201",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "lead-form", className: "py-20 md:py-24 bg-primary", "aria-labelledby": "lead-form-heading", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-primary-foreground animate-fade-in", children: [
      /* @__PURE__ */ jsx("h2", { id: "lead-form-heading", className: "text-3xl md:text-4xl font-serif font-bold mb-6", children: "Get a Free Compliance Quote" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-primary-foreground/80 mb-8 leading-relaxed", children: "Tell us about your compliance needs and we'll send you a personalized quote within 24 hours. No obligation, no pressure." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Prefer to talk?" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: CAL_LINK$3,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary-foreground/80 hover:text-primary-foreground underline",
                onClick: trackBookConsultation,
                children: "Book a 15-minute consultation"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Call us directly" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:601-647-1201",
                onClick: trackPhoneClick,
                className: "text-primary-foreground/80 hover:text-primary-foreground",
                children: "601-647-1201"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Email us" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:garland@cornerstoneriskmgt.com",
                className: "text-primary-foreground/80 hover:text-primary-foreground",
                children: "garland@cornerstoneriskmgt.com"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-2xl animate-slide-up", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-serif", children: "Request a Quote" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "We'll respond within 24 hours" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium mb-2", children: "Name *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "John Doe",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "company", className: "block text-sm font-medium mb-2", children: "Company *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "company",
              value: formData.company,
              onChange: (e) => setFormData({ ...formData, company: e.target.value }),
              placeholder: "Your Company Name",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium mb-2", children: "Email *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                placeholder: "john@company.com",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium mb-2", children: "Phone *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "phone",
                type: "tel",
                value: formData.phone,
                onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                placeholder: "(555) 123-4567",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "platforms", className: "block text-sm font-medium mb-2", children: "Platforms Needed *" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: formData.platforms,
              onValueChange: (value) => setFormData({ ...formData, platforms: value }),
              required: true,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select compliance platform(s)" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "isnetworld", children: "ISNetworld®" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "avetta", children: "Avetta®" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "veriforce", children: "Veriforce®" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "pec", children: "PEC Premier" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "browz", children: "BROWZ" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "multiple", children: "Multiple Platforms" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "not-sure", children: "Not Sure - Need Guidance" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "submit",
            size: "lg",
            disabled: isSubmitting,
            className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2",
            children: [
              isSubmitting ? "Sending..." : "Get My Quote",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground text-center", children: "No spam. We'll only contact you about your compliance needs." })
      ] }) })
    ] })
  ] }) }) });
};
const NewsletterSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-primary py-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4", children: "Monthly Safety Brief from Cornerstone" }),
    /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/80 mb-8 text-lg", children: "A free, print-ready toolbox talk delivered every month. Built by safety professionals for field teams." }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        action: "https://assets.mailerlite.com/jsonp/946498/forms/185017198337590744/subscribe",
        method: "post",
        target: "_blank",
        className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              name: "fields[email]",
              required: true,
              placeholder: "Enter your email",
              "aria-label": "Email address",
              className: "flex-1 px-4 py-3 rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold whitespace-nowrap hover:bg-accent/90 transition-colors",
              children: "Get My Free Safety Brief"
            }
          )
        ]
      }
    )
  ] }) }) });
};
const CAL_LINK$2 = "https://cal.com/garland-brent-wa1zbs/15min";
const FooterNew = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const services = [
    { name: "Digital Compliance Management", path: "/services/compliance-platforms" },
    { name: "Safety Program Development", path: "/services/safety-program-development" },
    { name: "Regulatory Compliance", path: "/services/regulatory-compliance" },
    { name: "Onsite Audits & Training", path: "/services/onsite-audits-training" },
    { name: "Risk Consulting", path: "/services/risk-consulting" }
  ];
  const platforms = [
    "ISNetworld®",
    "Avetta®",
    "Veriforce®",
    "PEC Premier®",
    "BROWZ®"
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(NewsletterSection, {}),
    /* @__PURE__ */ jsxs("footer", { className: "bg-primary text-primary-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-primary-foreground/10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-serif font-bold mb-2", children: "Ready to Get Compliant?" }),
          /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/70", children: "Book a free 15-minute consultation — no obligation" })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "lg",
            asChild: true,
            className: "bg-accent text-accent-foreground hover:bg-accent/90",
            children: /* @__PURE__ */ jsxs("a", { href: CAL_LINK$2, target: "_blank", rel: "noopener noreferrer", onClick: trackBookConsultation, children: [
              /* @__PURE__ */ jsx(Calendar, { className: "mr-2 h-5 w-5" }),
              "Book Free Consultation"
            ] })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-serif font-bold mb-4", children: "Cornerstone Risk Management" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/70 mb-4 leading-relaxed", children: "Professional compliance management for contractors. We handle ISNetworld, Avetta, Veriforce, and more — so you can focus on your work." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:601-647-1201",
                className: "flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
                  "601-647-1201"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:garland@cornerstoneriskmgt.com",
                className: "flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                  "garland@cornerstoneriskmgt.com"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-sm text-primary-foreground/70", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 mt-0.5" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "PO Box 271",
                /* @__PURE__ */ jsx("br", {}),
                "Crystal Springs, MS 39059"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Services" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: services.map((service) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: service.path,
              className: "text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors",
              children: service.name
            }
          ) }, service.path)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Platforms We Manage" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: platforms.map((platform) => /* @__PURE__ */ jsx("li", { className: "text-sm text-primary-foreground/70", children: platform }, platform)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Get Started" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/70 mb-4", children: "Free 15-minute consultation to discuss your compliance needs" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary",
              children: /* @__PURE__ */ jsxs("a", { href: CAL_LINK$2, target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "mr-2 h-4 w-4" }),
                "Book Consultation"
              ] })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-primary-foreground/10", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold mb-2 text-primary-foreground/70", children: "Trademarks" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-primary-foreground/50 mb-2 max-w-4xl", children: "Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with ISNetworld® or ISN Software Corporation." }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-primary-foreground/50 max-w-4xl", children: "ISNetworld® is a registered trademark of ISN Software Corporation. Avetta®, Veriforce®, PEC Premier®, and BROWZ® are registered trademarks of their respective owners." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-primary-foreground/10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-6", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-primary-foreground/50", children: [
        "© ",
        currentYear,
        " Cornerstone Risk Management. All rights reserved."
      ] }) }) })
    ] })
  ] });
};
const Index = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "ISNetworld®, Veriforce® & Avetta® Compliance Support Services | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "ISNetworld, Veriforce and Avetta compliance management for oil and gas contractors. 99 percent success rate. Setup from $900, maintenance from $250 per month."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "ISNetworld compliance support, Avetta compliance services, Veriforce compliance, contractor compliance, digital safety compliance, oil and gas compliance, contractor safety management, RAVS, PQF completion" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "ISNetworld®, Veriforce® & Avetta® Compliance Support Services | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "We provide digital compliance support so you can get back to work. 99% success rate, flat-rate pricing." }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://cornerstoneriskmgt.com/" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://cornerstoneriskmgt.com/og-image.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "ISNetworld®, Veriforce® & Avetta® Compliance Support Services" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "We provide digital compliance support so you can get back to work. 99% success rate." }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "US-MS" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: "Crystal Springs" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx(HeroNew, {}),
        /* @__PURE__ */ jsx(BenefitsSection, {}),
        /* @__PURE__ */ jsx(PricingSection, {}),
        /* @__PURE__ */ jsx(TrustSection, {}),
        /* @__PURE__ */ jsx(LeadForm, {})
      ] }) }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-gray-600", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 underline hover:text-blue-700", children: "Return to Home" })
  ] }) });
};
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };
  const services = [
    { name: "ISNetworld® / Veriforce® / Avetta® Management", path: "/services/compliance-platforms" },
    { name: "Safety Program Development", path: "/services/safety-program-development" },
    { name: "Regulatory Compliance Support", path: "/services/regulatory-compliance" },
    { name: "Onsite Audits & Training", path: "/services/onsite-audits-training" },
    { name: "Risk Consulting", path: "/services/risk-consulting" },
    { name: "Safety Management System (SMS)", path: "/services/safety-management-system" },
    { name: "Monthly Training Packages", path: "/services/monthly-training" }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "text-2xl font-serif font-bold text-primary hover:text-primary/80 transition-colors",
          children: "Cornerstone Risk Management"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-8", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative",
            onMouseEnter: () => setServicesDropdownOpen(true),
            onMouseLeave: () => setServicesDropdownOpen(false),
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1",
                  children: [
                    "Services",
                    /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
                  ]
                }
              ),
              servicesDropdownOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 pt-2 z-50", children: /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-lg shadow-lg py-2 min-w-[280px]", children: services.map((service) => /* @__PURE__ */ jsx(
                Link,
                {
                  to: service.path,
                  className: "block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                  children: service.name
                },
                service.path
              )) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollToSection("about"),
            className: "text-foreground hover:text-primary transition-colors font-medium",
            children: "About"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollToSection("contact"),
            className: "text-foreground hover:text-primary transition-colors font-medium",
            children: "Contact"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => scrollToSection("contact"),
            className: "bg-accent text-accent-foreground hover:bg-accent/90",
            children: "Get Started"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden text-foreground",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          children: /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-4 pb-4 space-y-3 animate-slide-up", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setMobileServicesOpen(!mobileServicesOpen),
            className: "flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors font-medium",
            children: [
              "Services",
              /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}` })
            ]
          }
        ),
        mobileServicesOpen && /* @__PURE__ */ jsx("div", { className: "pl-4 mt-2 space-y-2", children: services.map((service) => /* @__PURE__ */ jsx(
          Link,
          {
            to: service.path,
            onClick: () => setMobileMenuOpen(false),
            className: "block py-2 text-sm text-foreground hover:text-primary transition-colors",
            children: service.name
          },
          service.path
        )) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scrollToSection("about"),
          className: "block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium",
          children: "About"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scrollToSection("contact"),
          className: "block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium",
          children: "Contact"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => scrollToSection("contact"),
          className: "w-full bg-accent text-accent-foreground hover:bg-accent/90",
          children: "Get Started"
        }
      )
    ] })
  ] }) });
};
const logo = "/assets/cornerstone-logo-D83ysOxi.jpg";
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-primary text-primary-foreground py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { src: logo, alt: "Cornerstone Risk Management", className: "h-10 w-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/80 text-sm", children: "Expert digital safety compliance services for ISNetworld®, Avetta®, Veriforce® and more." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => {
            var _a;
            return (_a = document.getElementById("services")) == null ? void 0 : _a.scrollIntoView({
              behavior: "smooth"
            });
          }, className: "text-primary-foreground/80 hover:text-primary-foreground transition-colors", children: "Services" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => {
            var _a;
            return (_a = document.getElementById("about")) == null ? void 0 : _a.scrollIntoView({
              behavior: "smooth"
            });
          }, className: "text-primary-foreground/80 hover:text-primary-foreground transition-colors", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => {
            var _a;
            return (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({
              behavior: "smooth"
            });
          }, className: "text-primary-foreground/80 hover:text-primary-foreground transition-colors", children: "Contact" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { itemScope: true, itemType: "https://schema.org/ContactPoint", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Contact Info" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-primary-foreground/80", children: [
          /* @__PURE__ */ jsx("li", { itemProp: "telephone", children: "601-647-1201" }),
          /* @__PURE__ */ jsx("li", { itemProp: "email", children: "garland@cornerstoneriskmgt.com" }),
          /* @__PURE__ */ jsxs("li", { itemProp: "address", itemScope: true, itemType: "https://schema.org/PostalAddress", children: [
            /* @__PURE__ */ jsx("span", { itemProp: "streetAddress", children: "PO Box 271" }),
            ", ",
            /* @__PURE__ */ jsx("span", { itemProp: "addressLocality", children: "Crystal Springs" }),
            ", ",
            /* @__PURE__ */ jsx("span", { itemProp: "addressRegion", children: "MS" }),
            " ",
            /* @__PURE__ */ jsx("span", { itemProp: "postalCode", children: "39059" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80", children: /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Cornerstone Risk Management. All rights reserved."
    ] }) })
  ] }) });
};
const heroImage$6 = "/assets/hero-safety-program-dev-BiLKPK4x.jpg";
const SafetyProgramDevelopment = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Safety Program Development | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Professional safety program development for contractors & industrial operations. OSHA-compliant, customized safety programs with 15+ years experience."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "safety program development, OSHA compliance, contractor safety, industrial safety programs" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/safety-program-development" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$6,
                alt: "Safety program development for industrial contractors",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Safety Program Development for Contractors & Industrial Operations" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/90", children: "At Cornerstone Risk Management, we help Pipeline contractors, industrial service providers, and oil & gas support companies build safety programs that meet OSHA expectations, align with industry best practices, and reduce operational risk. With 15+ years of field and consulting experience, we create programs that are practical, compliant, and easy for your team to implement." }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Schedule Your Safety Program Review" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Our Approach to Safety Program Development" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-5 gap-6", children: [
            "We analyze your current program",
            "We identify gaps based on OSHA, IOGP, and client requirements",
            "We design your customized safety roadmap",
            "We implement documentation, procedures, and training",
            "We monitor and adjust as your business grows"
          ].map((step, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold", children: index + 1 }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: step })
          ] }) }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "What's Included in a Completed Safety Program" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: [
            "Written HSE manual aligned with OSHA 1910 and IOGP Report 423",
            "Hazard assessments and operating procedures",
            "Employee orientation packets",
            "JSA/JHA templates",
            "Safety meeting documents",
            "Field-level audit checklists",
            "Corrective action tracking",
            "ISNetworld® / Veriforce® / Avetta® documentation support"
          ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-primary w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { children: item })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Who This Service Is For" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            { icon: Users, title: "New Contractors", desc: "Entering new client facilities" },
            { icon: TrendingUp, title: "Growing Companies", desc: "Scaling operations and needing formal documentation" },
            { icon: FileText, title: "Outdated Programs", desc: "Businesses with patchwork safety programs" },
            { icon: CheckCircle2, title: "Client Alignment", desc: "Organizations needing alignment with industrial or oil & gas clients" }
          ].map((item, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: item.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Common Problems We Solve" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [
            "We don't have a documented safety program.",
            "Clients keep requesting additional safety procedures.",
            "Our program was copied from a template and needs real customization.",
            "We aren't sure what OSHA requires for our industry."
          ].map((problem, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("p", { className: "text-lg font-medium", children: [
            '"',
            problem,
            '"'
          ] }) }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Why Cornerstone Risk Management" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            "15+ years supporting Gulf Coast industrial contractors",
            "Practical, field-tested documentation",
            "Fast turnaround and ongoing support",
            "Strong familiarity with compliance platforms and operator expectations"
          ].map((benefit, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-primary w-8 h-8 mb-3" }),
            /* @__PURE__ */ jsx("p", { children: benefit })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-3xl", children: [
            /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "How long does it take to build a complete program?" }) }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { children: "Most programs take 1–2 weeks depending on your size and complexity." }) })
            ] }),
            /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Can you update a program we already have?" }) }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { children: "Yes — we can revise, rewrite, or modernize any existing documentation." }) })
            ] }),
            /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Do you handle client-specific addendums?" }) }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { children: "Absolutely. We regularly write programs for specific refinery, plant, or utility requirements." }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Ready to Build Your Safety Program?" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Schedule your Safety Program Review today and get started with a compliant, comprehensive safety program." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const heroImage$5 = "/assets/hero-regulatory-compliance-B9-_BhZz.jpg";
const RegulatoryCompliance = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Regulatory Compliance Support | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Expert regulatory compliance support for industrial & contractor operations. OSHA, DOT, and industry-specific compliance services in Mississippi and Gulf Coast."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "regulatory compliance, OSHA compliance, DOT compliance, industrial compliance, contractor compliance" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/regulatory-compliance" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$5,
                alt: "Regulatory compliance support for industrial operations",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Regulatory Compliance Support for Industrial & Contractor Operations" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/90", children: "Regulatory compliance is complex and ever-changing. Cornerstone Risk Management helps Mississippi and Gulf Coast companies stay aligned with OSHA, DOT (if applicable), and industry-specific requirements so your team stays safe and your operations stay uninterrupted." }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Book a Compliance Consultation" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Our Compliance Support Process" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-5 gap-6", children: [
            { icon: FileCheck, title: "Review", desc: "We review your current documentation and operations" },
            { icon: AlertCircle, title: "Identify", desc: "We identify compliance gaps" },
            { icon: Shield, title: "Prioritize", desc: "We prioritize immediate risks" },
            { icon: CheckCircle2, title: "Develop", desc: "We develop corrective actions and required documentation" },
            { icon: CheckCircle2, title: "Monitor", desc: "We provide ongoing monitoring and updates" }
          ].map((step, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 text-center", children: [
            /* @__PURE__ */ jsx(step.icon, { className: "w-12 h-12 text-primary mx-auto mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: step.desc })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Compliance Areas We Support" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: [
            "OSHA 1910 General Industry",
            "IOGP Report 423 alignment",
            "Electrical, confined space, LOTO, hazard communication, PPE, and hot work programs",
            "Recordkeeping and OSHA logs",
            "Incident investigation and reporting",
            "Safety training and documentation packages"
          ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-primary w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: item })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Common Problems We Solve" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
            "We aren't sure what OSHA requires for our size/type of company.",
            "We failed a client audit and need immediate corrections.",
            "Our training documentation is disorganized."
          ].map((problem, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-primary mb-4" }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-medium", children: [
              '"',
              problem,
              '"'
            ] })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Deliverables You Receive" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
            { icon: FileCheck, title: "Updated Policies", desc: "Updated policies and procedures" },
            { icon: Shield, title: "Audit Report", desc: "Regulatory compliance audit report" },
            { icon: CheckCircle2, title: "Action Plan", desc: "Corrective action plan" },
            { icon: FileCheck, title: "Documentation", desc: "Required safety postings and documentation templates" },
            { icon: CheckCircle2, title: "Follow-up", desc: "Monthly or quarterly follow-up support" }
          ].map((item, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: item.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: item.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Stay Compliant and Secure" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Book a compliance consultation and ensure your operations meet all regulatory requirements." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const heroImage$4 = "/assets/hero-audits-training-xQAhyDxo.jpg";
const OnsiteAuditsTraining = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Onsite Safety Audits & Training | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Professional onsite safety audits and employee training services. Identify hazards, improve work practices, and strengthen your safety culture."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "safety audits, onsite training, employee safety training, facility audits, compliance audits" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/onsite-audits-training" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$4,
                alt: "Onsite safety audits and employee training",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Onsite Safety Audits & Employee Training" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/90", children: "Cornerstone Risk Management provides professional onsite audits and tailored training that identify hazards, improve work practices, and strengthen your safety culture." }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Request an Onsite Audit or Training Session" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Audit Services" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", children: [
            { icon: ClipboardCheck, title: "Facility Safety Audits", desc: "Comprehensive evaluation of your facility" },
            { icon: Users, title: "Field Observations", desc: "On-the-ground work practice assessments" },
            { icon: CheckCircle2, title: "Client Readiness Audits", desc: "Pre-qualification preparation" },
            { icon: ClipboardCheck, title: "Regulatory Compliance Reviews", desc: "OSHA and industry standard verification" },
            { icon: Camera, title: "Incident Analysis", desc: "Root cause investigation and trend reviews" }
          ].map((service, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(service.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: service.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: service.desc }) })
          ] }, index)) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6", children: "Audit Deliverables Include:" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: [
            "Full written audit report",
            "Corrective action recommendations",
            "Photos, documentation findings, and risk prioritization"
          ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-primary w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: item })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Employee Training Services" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-3xl", children: "We provide practical, field-focused training on topics such as:" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            "Heat stress and hydration",
            "Hazard communication",
            "PPE and basic industrial safety",
            "JSA / JHA training",
            "Confined space awareness",
            "Lockout/tagout (awareness-level)",
            "New-hire safety orientation"
          ].map((topic, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "text-primary w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: topic })
          ] }) }) }, index)) }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg mt-8 text-center", children: [
            "Training can be delivered ",
            /* @__PURE__ */ jsx("strong", { children: "onsite" }),
            " or ",
            /* @__PURE__ */ jsx("strong", { children: "virtually" }),
            "."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Why This Matters" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            { icon: CheckCircle2, title: "Lower Injury Rates", desc: "Reduce workplace incidents and improve safety metrics" },
            { icon: Users, title: "Increased Client Confidence", desc: "Demonstrate commitment to safety standards" },
            { icon: ClipboardCheck, title: "Better Operational Consistency", desc: "Standardize procedures across your team" },
            { icon: CheckCircle2, title: "Improved Compliance", desc: "Meet OSHA and client expectations" }
          ].map((benefit, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(benefit.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: benefit.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: benefit.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Strengthen Your Safety Culture" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Request an onsite audit or training session and take your safety program to the next level." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const heroImage$3 = "/assets/hero-risk-consulting-DEOFzJAg.jpg";
const RiskConsulting = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contractor & Industrial Risk Consulting | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Expert risk management consulting for contractors and industrial service companies. Reduce risk, improve job execution, and meet client expectations."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "risk consulting, contractor risk management, industrial consulting, operational risk, safety consulting" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/risk-consulting" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$3,
                alt: "Risk management consulting for contractors",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Contractor & Industrial Risk Management Consulting" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/90", children: "We help contractors and industrial service companies reduce risk, improve job execution, and meet client expectations through hands-on consulting support." }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Schedule a Risk Consulting Session" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "What We Do" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-5 gap-6", children: [
            { icon: TrendingUp, title: "Evaluate", desc: "Evaluate your operational risk profile" },
            { icon: CheckCircle2, title: "Conduct", desc: "Conduct job-level hazard assessments" },
            { icon: FileText, title: "Develop", desc: "Develop work processes and SOPs" },
            { icon: Users, title: "Coach", desc: "Provide ongoing coaching for supervisors and leads" },
            { icon: CheckCircle2, title: "Monitor", desc: "Monitor leading indicators and improve safety culture" }
          ].map((item, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 text-center", children: [
            /* @__PURE__ */ jsx(item.icon, { className: "w-12 h-12 text-primary mx-auto mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.desc })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Typical Clients" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            { icon: Wrench, title: "Industrial Contractors", desc: "Multi-trade contractors serving industrial clients" },
            { icon: TrendingUp, title: "Oil & Gas Support", desc: "Companies providing pipeline and field services" },
            { icon: Users, title: "Maintenance & Service", desc: "Maintenance and service-based businesses" },
            { icon: CheckCircle2, title: "Environmental Firms", desc: "Environmental and remediation firms" }
          ].map((client, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(client.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: client.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: client.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Deliverables" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [
            { icon: FileText, title: "Risk Assessment Report", desc: "Comprehensive evaluation of your operational risks and improvement opportunities" },
            { icon: CheckCircle2, title: "Improved Workflows", desc: "Improved workflows and process documentation tailored to your operations" },
            { icon: Users, title: "Training Aids", desc: "Toolbox talk and training aids for your supervisors and field teams" },
            { icon: TrendingUp, title: "Ongoing Recommendations", desc: "Ongoing improvement recommendations to sustain safety performance" }
          ].map((deliverable, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(deliverable.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: deliverable.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: deliverable.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Why Work With Us" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
            "15+ years of field and consulting experience",
            "Practical, hands-on approach to risk management",
            "Strong understanding of contractor operations and client expectations"
          ].map((benefit, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-12 h-12 text-primary mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: benefit })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Reduce Risk, Improve Performance" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Schedule a risk consulting session and get expert guidance to strengthen your operations." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const TrademarkNotice = ({ variant = "default", className = "" }) => {
  const disclaimer = "Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with ISNetworld® or ISN Software Corporation.";
  const attribution = "ISNetworld® and RAVS® are registered trademarks of ISN Software Corporation.";
  if (variant === "footer") {
    return /* @__PURE__ */ jsxs("div", { className: `text-xs text-primary-foreground/50 ${className}`, children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1", children: disclaimer }),
      /* @__PURE__ */ jsx("p", { children: attribution })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: `bg-muted/50 border border-border rounded-lg p-4 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx(Info, { className: "h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: disclaimer }),
      /* @__PURE__ */ jsx("p", { className: "text-xs", children: attribution })
    ] })
  ] }) });
};
const heroImage$2 = "/assets/hero-compliance-platforms-BprzUTDX.jpg";
const CompliancePlatforms = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "ISNetworld® / Veriforce® / Avetta® Compliance Support Services | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Expert ISNetworld®, Veriforce®, and Avetta® compliance support services. We handle account setup, document uploads, questionnaires, and ongoing maintenance. 99% success rate across all platforms."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "ISNetworld compliance support, Veriforce compliance services, Avetta compliance support, RAVS compliance, contractor prequalification" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/compliance-platforms" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$2,
                alt: "ISNetworld® Veriforce® Avetta® compliance support services",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "ISNetworld® / Veriforce® / Avetta® Compliance Support Services" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/90", children: "Cornerstone Risk Management helps contractors navigate online compliance platforms so they can qualify for more clients and maintain strong standing in each system." }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Get Help With Your Compliance Platform Accounts" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "What's Included" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-5 gap-6", children: [
            { icon: FileCheck, title: "Account Setup", desc: "We set up or update your account" },
            { icon: Upload, title: "Document Upload", desc: "We upload all safety documentation and RAVS® documents" },
            { icon: CheckCircle2, title: "Questionnaires", desc: "We complete questionnaires and scoring elements" },
            { icon: Award, title: "Documentation", desc: "We manage insurance, training, and EMR documentation" },
            { icon: RefreshCw, title: "Score Review", desc: "We review your score and correct issues" }
          ].map((service, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 text-center", children: [
            /* @__PURE__ */ jsx(service.icon, { className: "w-12 h-12 text-primary mx-auto mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: service.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: service.desc })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Common Problems We Solve" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            "Missing documentation",
            "Outdated procedures",
            "Low scores preventing client approval",
            "Confusion around questionnaire requirements"
          ].map((problem, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("p", { className: "text-lg font-medium text-center", children: [
            '"',
            problem,
            '"'
          ] }) }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Platforms We Support" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: [
            { name: "ISNetworld®", desc: "Comprehensive support for ISNetworld® accounts, including RAVS® uploads and questionnaire completion" },
            { name: "Veriforce®", desc: "Complete support for Veriforce® profiles, training records, and compliance documentation" },
            { name: "Avetta®", desc: "Full service support for Avetta® account setup, maintenance, and ongoing compliance needs" }
          ].map((platform, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(Award, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: platform.name })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: platform.desc }) })
          ] }, index)) }),
          /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mt-8", children: /* @__PURE__ */ jsx(TrademarkNotice, {}) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Deliverables" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [
            "Completed account profile",
            "Full document upload",
            "Updated safety programs",
            "Ongoing monthly or quarterly maintenance options"
          ].map((deliverable, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-primary w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: deliverable })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Why Choose Cornerstone" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
            "15+ years navigating compliance platforms",
            "Fast turnaround and responsive support",
            "Strong understanding of what clients look for in contractor profiles"
          ].map((benefit, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-12 h-12 text-primary mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: benefit })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Qualify for More Clients" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Get expert help with your compliance platforms and improve your standing with industrial clients." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const PLATFORMS = [
  "ISNetworld",
  "Veriforce",
  "Avetta",
  "PEC Premier",
  "BROWZ",
  "Other"
];
const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(150),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  platform: z.string().min(1, "Please select a platform"),
  message: z.string().max(2e3).optional()
});
const IsnQuoteForm = ({
  defaultPlatform = "",
  messagePlaceholder = "Current score, recent audit findings, or anything else we should know.",
  sourcePage = "isnetworld-help"
}) => {
  const { toast: toast2 } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    platform: defaultPlatform,
    message: ""
  });
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSubmit = async (e) => {
    var _a, _b;
    (_a = e == null ? void 0 : e.preventDefault) == null ? void 0 : _a.call(e);
    if (submitting) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast2({
        title: "Please check the form",
        description: ((_b = parsed.error.issues[0]) == null ? void 0 : _b.message) ?? "Invalid input",
        variant: "destructive"
      });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-isn-quote", {
        body: parsed.data
      });
      if (error || !(data == null ? void 0 : data.success)) throw new Error((error == null ? void 0 : error.message) || "Send failed");
      toast2({
        title: "Request received!",
        description: "We'll contact you within 24 hours with a quote."
      });
      trackQuoteFormSubmission(parsed.data.platform, sourcePage);
      setForm({ name: "", company: "", email: "", phone: "", platform: defaultPlatform, message: "" });
    } catch (err) {
      toast2({
        title: "Something went wrong",
        description: "Please call 601-647-1201 or email garland@cornerstoneriskmgt.com.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      noValidate: true,
      className: "bg-background text-foreground rounded-lg p-6 md:p-8 max-w-2xl mx-auto text-left shadow-lg",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name *" }),
            /* @__PURE__ */ jsx(Input, { id: "name", value: form.name, onChange: (e) => update("name", e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "company", children: "Company *" }),
            /* @__PURE__ */ jsx(Input, { id: "company", value: form.company, onChange: (e) => update("company", e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email *" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: form.email, onChange: (e) => update("email", e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone *" }),
            /* @__PURE__ */ jsx(Input, { id: "phone", type: "tel", value: form.phone, onChange: (e) => update("phone", e.target.value), required: true })
          ] }),
          !defaultPlatform && /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "platform", children: "Platforms Needed *" }),
            /* @__PURE__ */ jsxs(Select, { value: form.platform, onValueChange: (v) => update("platform", v), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { id: "platform", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a platform" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: PLATFORMS.map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "message", children: "Tell us about your account (optional)" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "message",
                rows: 4,
                value: form.message,
                onChange: (e) => update("message", e.target.value),
                placeholder: messagePlaceholder
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "button", size: "lg", onClick: handleSubmit, className: "w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90", disabled: submitting, children: submitting ? "Sending..." : "Send My Quote Request" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground text-center mt-3", children: "No obligation, no pressure. We'll respond within 24 hours." })
      ]
    }
  );
};
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const whatWeDo$2 = [
  {
    icon: FileCheck,
    title: "RAVS® Review, Formatting & Upload",
    desc: "Including correcting common rejection causes — revision-date mismatches, missing required clauses, and outdated language."
  },
  {
    icon: ClipboardList,
    title: "Client-Specific Questionnaires",
    desc: "Responses kept current as your hiring clients add or change requirements."
  },
  {
    icon: ShieldCheck,
    title: "Insurance Certificate Renewal Tracking",
    desc: "We track expirations and coordinate updates so your COIs stay current in the system."
  },
  {
    icon: ClipboardList,
    title: "Questionnaire & Form Completion",
    desc: "You provide the input, we format it the way ISNetworld® expects."
  },
  {
    icon: TrendingUp,
    title: "Score Monitoring & Recovery",
    desc: "We monitor your score and address what's pulling it down."
  },
  {
    icon: CalendarClock,
    title: "Ongoing Monitoring",
    desc: "Nothing expires while you're focused on the work — insurance, training, and OSHA logs all on a tracked calendar."
  }
];
const problems$2 = [
  {
    problem: "My RAVS® keep getting rejected.",
    answer: "Usually a revision-date mismatch or a missing required clause. We catch these before submission, not after."
  },
  {
    problem: "My score dropped and I don't know why.",
    answer: "Often expired training records, lapsed certificates, or unfilled questionnaire updates. We diagnose the root cause and fix it."
  },
  {
    problem: "My client added a new questionnaire and I have no idea what they want.",
    answer: "We translate the requirement, write the response with your input, and submit it."
  },
  {
    problem: "I have audit findings I don't know how to close.",
    answer: "We review each finding, build the corrective action, and resubmit until they're cleared."
  },
  {
    problem: "Things keep expiring and I find out too late.",
    answer: "Ongoing maintenance puts insurance, training, and OSHA logs on a tracked calendar. Nothing expires unannounced."
  }
];
const faqs$2 = [
  {
    q: "How fast can you fix a failed audit?",
    a: "Most failed-audit findings are fixed within a week or less once we have access to your account. Larger gaps that require new documentation from your team can take longer, but the typical turnaround is fast."
  },
  {
    q: "Will I get a passing score above my client's threshold?",
    a: "We'll tell you what's pulling it down and whether it's fixable. Most score issues are documentation gaps, not underlying safety performance gaps."
  },
  {
    q: "What if my client adds a new questionnaire mid-cycle?",
    a: "Covered under monthly maintenance. We complete the questionnaire with your input and submit it."
  },
  {
    q: "Can I do this myself?",
    a: "Yes, but most clients hand it off — we operate the account end-to-end. Most clients haven't logged in for months."
  },
  {
    q: "Is there a long-term contract?",
    a: "No annual commitment. Cancel anytime; your account stays exactly where it is."
  }
];
const Isnetworld = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs$2.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "ISNetworld® Compliance Help | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "ISNetworld® compliance experts. RAVS® uploads, questionnaires, score recovery, and audit fixes — handled end-to-end. 99% success rate. 100+ contractors managed. 15+ years experience."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "ISNetworld compliance, RAVS upload, ISNetworld score, ISNetworld questionnaire, contractor prequalification, ISNetworld audit"
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/isnetworld" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqJsonLd) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$2,
                alt: "ISNetworld® compliance management for contractors",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base font-semibold uppercase tracking-wider text-accent mb-4", children: "ISNetworld® Compliance Experts · 99% Success Rate · 100+ Contractors Managed · 15+ Years Experience" }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "ISNetworld® Compliance Management" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-4 text-primary-foreground/95", children: "Stop losing contracts because of RAVS® uploads, score drops, or questionnaire confusion." }),
            /* @__PURE__ */ jsx("p", { className: "text-lg mb-8 text-primary-foreground/85", children: "We handle the paperwork end-to-end so your account stays in the green and your bids stay alive." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Get a Free ISN Compliance Quote" }) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary",
                  asChild: true,
                  children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" })
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4 text-center", children: "What We Do" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground mb-12 max-w-2xl mx-auto", children: "Full-service ISNetworld® account management — from RAVS® uploads to ongoing monitoring." }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: whatWeDo$2.map((item, i) => /* @__PURE__ */ jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsx(item.icon, { className: "w-12 h-12 text-accent mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: item.desc })
          ] }) }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Problems We Solve" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: problems$2.map((p, i) => /* @__PURE__ */ jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg mb-3 text-primary", children: [
              '"',
              p.problem,
              '"'
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: p.answer })
          ] }) }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Why Cornerstone" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: [
            "99% success rate across submissions",
            "100+ contractors actively managed",
            "15+ years inside ISNetworld® workflows"
          ].map((b, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-accent w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: b })
          ] }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mt-12", children: /* @__PURE__ */ jsx(TrademarkNotice, {}) })
        ] }) }),
        /* @__PURE__ */ jsx(PricingSection, {}),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs$2.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${i}`, children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-semibold", children: f.q }),
            /* @__PURE__ */ jsx(AccordionContent, { className: "text-base text-muted-foreground", children: f.a })
          ] }, i)) }) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            id: "contact",
            className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Get a Free ISN Compliance Quote" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90", children: "Tell us about your account and we'll send you a personalized quote within 24 hours. No obligation, no pressure." }),
              /* @__PURE__ */ jsx(IsnQuoteForm, { defaultPlatform: "ISNetworld", sourcePage: "isnetworld-help" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mt-10", children: [
                /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary",
                    asChild: true,
                    children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" })
                  }
                )
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const whatWeDo$1 = [
  "Avetta account setup or reset",
  "Insurance certificate uploads and renewal tracking",
  "Training records and OSHA log uploads (annual and on-demand)",
  "Custom client requirement responses — when an oil major adds requirements on top of Avetta's baseline, we map them to your evidence and respond in the format auditors look for",
  "Audit grade review and scoring remediation",
  "Quarterly hours and incident reporting",
  "Pre-audit review and reviewer feedback responses until approved"
];
const problems$1 = [
  {
    problem: "I am scheduled for an Avetta audit and I am not sure I will pass.",
    answer: "We pre-audit your account, identify gaps, and close them before your audit window opens."
  },
  {
    problem: "My Avetta grade dropped and I do not know why.",
    answer: "Usually expired insurance, lapsed training, or a new client requirement that has not been responded to. We find the cause and fix it."
  },
  {
    problem: "A new client added 12 custom requirements and I do not have time to write the responses.",
    answer: "We do this. Your input guides the answer; we format it the way Avetta auditors expect."
  },
  {
    problem: "My account went red and a client is asking about it.",
    answer: "We get most accounts back to green within 2 to 4 weeks."
  },
  {
    problem: "I never know which documents are about to expire.",
    answer: "Monthly maintenance includes a tracked renewal calendar."
  }
];
const faqs$1 = [
  {
    q: "Can you handle Avetta's custom client requirements?",
    a: "Yes. Each oil major or industrial client can layer custom requirements on top of Avetta's baseline. Monthly maintenance covers responses as they're issued."
  },
  {
    q: "Is your $300 per month dual-platform price the same if I pair Avetta with another platform?",
    a: "Yes. The rate is the same regardless of which two platforms you pair. Most clients pair Avetta with either ISN or Veriforce."
  },
  {
    q: "Do you handle drug and alcohol program documentation in Avetta?",
    a: "We work with your existing D&A program and submit the documentation in the format Avetta expects. If you do not have a written D&A program yet, that's a separate scope (custom safety program writing is not included in maintenance), but we can scope it."
  },
  {
    q: "How long does an Avetta setup take?",
    a: "Most setups complete in 2 to 4 weeks once we have your insurance certificates, safety programs, and questionnaire inputs."
  },
  {
    q: "What if my Avetta auditor pushes back on a response?",
    a: "Reviewer feedback responses are part of setup and maintenance. We rewrite, resubmit, and re-engage until your account is approved."
  }
];
const Avetta = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs$1.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Avetta® Compliance Help | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Avetta audit coming up? We get contractors approved and keep them there. Audit prep, scoring remediation, custom client requirements. 99% success. From $900 setup, $250/mo."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/avetta-help" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqJsonLd) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$2,
                alt: "Avetta compliance management for contractors",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base font-semibold uppercase tracking-wider text-accent mb-4", children: "Audit Prep · Scoring Remediation · Custom Client Requirements" }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Avetta Compliance Management" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/95", children: "From account setup to audit prep, scoring remediation, and custom client requirement responses, we handle Avetta end-to-end so you stay eligible to bid." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Get a Free Avetta Compliance Quote" }) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary",
                  asChild: true,
                  children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" })
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "What We Do for Your Avetta Account" }),
          /* @__PURE__ */ jsx("ol", { className: "max-w-3xl mx-auto space-y-4", children: whatWeDo$1.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-9 h-9 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center", children: i + 1 }),
            /* @__PURE__ */ jsx("p", { className: "text-lg pt-1", children: item })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Common Avetta Problems We Solve" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: problems$1.map((p, i) => /* @__PURE__ */ jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg mb-3 text-primary", children: [
              '"',
              p.problem,
              '"'
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: p.answer })
          ] }) }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Why Cornerstone" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: [
            "99% success rate across submissions",
            "100+ contractors actively managed",
            "15+ years inside Avetta workflows"
          ].map((b, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-accent w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: b })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx(PricingSection, {}),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs$1.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${i}`, children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-semibold", children: f.q }),
            /* @__PURE__ */ jsx(AccordionContent, { className: "text-base text-muted-foreground", children: f.a })
          ] }, i)) }) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            id: "contact",
            className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Get a Free Avetta Compliance Quote" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90", children: "Tell us about your account, audit timeline, or scoring concern. We'll send a personalized quote within 24 hours." }),
              /* @__PURE__ */ jsx(
                IsnQuoteForm,
                {
                  defaultPlatform: "Avetta",
                  sourcePage: "avetta-help",
                  messagePlaceholder: "Current grade, recent audit findings, or anything else we should know."
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mt-10", children: [
                /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary",
                    asChild: true,
                    children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-primary-foreground/70 mt-10 max-w-3xl mx-auto", children: "Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with Avetta, LLC. Avetta is a registered trademark of Avetta, LLC." })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const whatWeDo = [
  "Veriforce account setup or reset",
  "Operator Qualification (OQ) tracking and documentation",
  "Pipeline contractor compliance — alignment with DOT 49 CFR Part 192 (gas) and Part 195 (hazardous liquid). We work from the live regulatory text, not internal shorthand.",
  "Training records uploads and renewal tracking",
  "Drug and alcohol program documentation (DOT-aligned)",
  "Quarterly hours and incident reporting",
  "Pre-audit review and reviewer feedback responses"
];
const problems = [
  {
    problem: "My OQ records are out of date and a client just asked for proof.",
    answer: "We bring OQ tracking current and submit documentation in the format Veriforce expects."
  },
  {
    problem: "My drug and alcohol program changed and I haven't updated Veriforce.",
    answer: "We update the documentation and tie it to the appropriate DOT references."
  },
  {
    problem: "My account dropped because of expired training certs.",
    answer: "Monthly maintenance tracks renewals on a calendar and updates them before expiration."
  },
  {
    problem: "I am not sure which Veriforce sub-platform a client wants me on.",
    answer: "We confirm with your client, set it up correctly the first time, and document it for your records."
  },
  {
    problem: "My audit is in 30 days and I haven't started.",
    answer: "We pre-audit, identify gaps, and close them before your window opens."
  }
];
const faqs = [
  {
    q: "Do you handle DOT-regulated pipeline contractors specifically?",
    a: "Yes. Veriforce's pipeline contractor compliance falls under DOT 49 CFR Part 192 (gas) and Part 195 (hazardous liquid). We reference the actual regulatory text and recommend you verify against the live reference rather than relying on summaries."
  },
  {
    q: "Can you keep my OQ tracking current?",
    a: "Yes — OQ tracking is included in monthly maintenance. We track renewal cycles and prompt for re-evaluation before expiration."
  },
  {
    q: "Will you write a drug and alcohol program for me?",
    a: "Custom safety program writing is not included in standard maintenance — it's a separate scope. But we'll review and upload an existing D&A program, or document the changes needed to bring it into Veriforce/DOT alignment."
  },
  {
    q: "What if my contracts pull from multiple platforms (ISN, Avetta, Veriforce, BROWZ, PEC)?",
    a: "We coordinate across all of them. Most cross-platform issues are resolved by getting each underlying account to a clean, current state — which is exactly what monthly maintenance does."
  },
  {
    q: "Can you support a contractor that is brand-new to Veriforce?",
    a: "Yes — that's what setup is for. $900 covers the full setup including questionnaire completion and reviewer feedback responses until approved."
  }
];
const Veriforce = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Veriforce® Compliance Help, Including OQ | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Need help with Veriforce? Operator Qualification, training, D&A, and audit prep, handled end-to-end. 99% success. From $900 setup, $250/mo. Call 601-647-1201."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/veriforce-help" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqJsonLd) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$2,
                alt: "Veriforce compliance management for contractors",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base font-semibold uppercase tracking-wider text-accent mb-4", children: "Operator Qualification · DOT-Aligned · Pipeline Contractors Welcome" }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Veriforce Compliance Management" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/95", children: "Operator Qualification, training records, drug and alcohol program documentation, and audit prep — all handled end-to-end so your contractors stay eligible to work." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Get a Free Veriforce Compliance Quote" }) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary",
                  asChild: true,
                  children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" })
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "What We Do for Your Veriforce Account" }),
          /* @__PURE__ */ jsx("ol", { className: "max-w-3xl mx-auto space-y-4", children: whatWeDo.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-9 h-9 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center", children: i + 1 }),
            /* @__PURE__ */ jsx("p", { className: "text-lg pt-1", children: item })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Common Veriforce Problems We Solve" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: problems.map((p, i) => /* @__PURE__ */ jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg mb-3 text-primary", children: [
              '"',
              p.problem,
              '"'
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: p.answer })
          ] }) }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Why Cornerstone" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: [
            "99% success rate across submissions",
            "100+ contractors actively managed",
            "15+ years inside Veriforce workflows"
          ].map((b, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-accent w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: b })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx(PricingSection, {}),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${i}`, children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-semibold", children: f.q }),
            /* @__PURE__ */ jsx(AccordionContent, { className: "text-base text-muted-foreground", children: f.a })
          ] }, i)) }) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "section",
          {
            id: "contact",
            className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Get a Free Veriforce Compliance Quote" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90", children: "Whether you need OQ help, audit prep, or full account management, tell us your situation and we'll send a personalized quote within 24 hours." }),
              /* @__PURE__ */ jsx(
                IsnQuoteForm,
                {
                  defaultPlatform: "Veriforce",
                  sourcePage: "veriforce-help",
                  messagePlaceholder: "OQ status, audit timeline, or anything else we should know."
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mt-10", children: [
                /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary",
                    asChild: true,
                    children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-primary-foreground/70 mt-10 max-w-3xl mx-auto", children: "Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with Veriforce, LLC. Veriforce is a registered trademark of Veriforce, LLC." })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const heroImage$1 = "/assets/hero-safety-management-system-C32V8Jca.jpg";
const SafetyManagementSystem = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Safety Management System (SMS) Development | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Professional SMS development and implementation services. Build scalable safety management systems that work in the real world for contractors and industrial companies."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "safety management system, SMS development, safety framework, safety program implementation, contractor SMS" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/safety-management-system" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage$1,
                alt: "Safety management system development and implementation",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Safety Management System (SMS) Development & Implementation" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/90", children: "A strong Safety Management System gives your company structure, consistency, and long-term improvement. We build scalable SMS frameworks that work in the real world — not just on paper." }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Start Building Your Safety Management System" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "SMS Components We Build" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            { icon: FileText, title: "Policies & Procedures", desc: "Comprehensive written policies and operating procedures" },
            { icon: Users, title: "Roles & Responsibilities", desc: "Clear accountability structure across your organization" },
            { icon: ClipboardCheck, title: "Training Structure", desc: "Training structure and competency tracking systems" },
            { icon: AlertCircle, title: "Risk Assessment", desc: "Risk assessment processes and hazard identification" },
            { icon: Shield, title: "Audit Programs", desc: "Audit and assurance programs for ongoing verification" },
            { icon: FileText, title: "Incident Reporting", desc: "Incident reporting and investigation workflow" },
            { icon: CheckCircle2, title: "Document Control", desc: "Document control and version tracking" }
          ].map((component, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(component.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: component.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: component.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Why an SMS Matters" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            { icon: Shield, title: "Stronger Client Confidence", desc: "Demonstrate systematic approach to safety management" },
            { icon: CheckCircle2, title: "More Consistent Operations", desc: "Standardize processes across projects and teams" },
            { icon: FileText, title: "Better Regulatory Alignment", desc: "Meet OSHA, IOGP, and client-specific requirements" },
            { icon: TrendingUp, title: "Reduced Incidents", desc: "Proactively identify and mitigate risks before incidents occur" }
          ].map((benefit, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(benefit.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: benefit.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: benefit.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Our Approach" }),
          /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto space-y-6", children: [
            { title: "Assessment", desc: "We evaluate your current safety program and operational needs" },
            { title: "Design", desc: "We design an SMS framework tailored to your company size and industry" },
            { title: "Documentation", desc: "We create all required policies, procedures, and forms" },
            { title: "Implementation", desc: "We guide you through rollout and employee training" },
            { title: "Monitoring", desc: "We establish metrics and ongoing performance monitoring" }
          ].map((step, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl", children: index + 1 }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: step.title })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground ml-16", children: step.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8", children: "Deliverables" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [
            "Complete SMS framework documentation",
            "Custom documentation packet aligned with your operations",
            "Implementation roadmap with timeline and milestones",
            "Ongoing performance monitoring and improvement recommendations"
          ].map((deliverable, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-primary w-6 h-6 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: deliverable })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Who Needs an SMS?" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
            "Growing contractors needing formal structure",
            "Companies with multiple locations or project sites",
            "Organizations pursuing ISO 45001 or similar certifications"
          ].map((client, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-12 h-12 text-primary mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg", children: client })
          ] }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Build a Safety System That Works" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Start building your Safety Management System and create lasting structure for your safety program." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const heroImage = "/assets/hero-monthly-training-BZ3roBqi.jpg";
const MonthlyTraining = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Monthly Safety Training Packages | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Custom monthly safety training packages for contractors & industrial teams. Professionally designed, turnkey training content delivered monthly with your company branding."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "monthly safety training, contractor training, toolbox talks, safety meetings, employee training packages" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/services/monthly-training" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs("section", { className: "relative min-h-[60vh] flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage,
                alt: "Monthly safety training packages for contractors",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6 text-primary-foreground", children: "Monthly Safety Training Packages for Contractors & Industrial Teams" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 text-primary-foreground/90", children: "We create custom monthly training packages that help your team stay compliant, informed, and prepared — without the stress of building content yourself." }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Subscribe to Monthly Training Packages" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: "What's Included Each Month" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
            { icon: BookOpen, title: "Professional Slide Deck", desc: "Professionally designed slide deck with your company branding" },
            { icon: CheckCircle2, title: "Relevant Topics", desc: "Safety topic aligned with OSHA/industry trends" },
            { icon: FileCheck, title: "Visuals & Infographics", desc: "Engaging visuals and infographics to enhance learning" },
            { icon: Users, title: "Instructor Notes", desc: "Detailed instructor notes for easy delivery" },
            { icon: FileCheck, title: "Attendance Sheet", desc: "Ready-to-use attendance tracking sheet" },
            { icon: CheckCircle2, title: "Knowledge Check", desc: "Quiz or knowledge check to verify understanding" },
            { icon: FileCheck, title: "Platform Documentation", desc: "Documentation ready for ISNetworld® / Veriforce® upload" }
          ].map((item, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: item.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Who This Helps" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
            { icon: Users, title: "Busy Owners", desc: "Busy owners who need turnkey training solutions" },
            { icon: CheckCircle2, title: "Small Companies", desc: "Companies without an internal HSE department" },
            { icon: Calendar, title: "All Teams", desc: "Teams that need consistent, reliable safety content" }
          ].map((client, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(client.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: client.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: client.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Examples of Topics" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
            "Heat stress & hydration",
            "PPE basics",
            "Slips, trips, and falls",
            "Chemical handling",
            "Job hazard analysis fundamentals",
            "Cold stress",
            "Fire safety",
            "Ladder safety",
            "Hand & power tool safety",
            "Housekeeping & workplace organization",
            "Electrical awareness",
            "Confined space awareness"
          ].map((topic, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "text-primary w-5 h-5 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: topic })
          ] }) }) }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Why Subscribe" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
            { icon: CheckCircle2, title: "Save Time", desc: "No need to research or build training content from scratch" },
            { icon: Calendar, title: "Stay Consistent", desc: "Monthly delivery ensures regular training schedule" },
            { icon: FileCheck, title: "Meet Requirements", desc: "Satisfy client and OSHA training documentation requirements" },
            { icon: Users, title: "Professional Quality", desc: "Polished, branded materials that reflect well on your company" }
          ].map((benefit, index) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(benefit.icon, { className: "w-12 h-12 text-primary mb-4" }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: benefit.title })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: benefit.desc }) })
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "How It Works" }),
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto space-y-6", children: [
            { step: 1, title: "Subscribe", desc: "Choose your monthly training package subscription" },
            { step: 2, title: "Receive", desc: "Get your branded training materials delivered each month" },
            { step: 3, title: "Deliver", desc: "Conduct the training with your team using provided materials" },
            { step: 4, title: "Document", desc: "File documentation for compliance platform uploads" }
          ].map((item) => /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl", children: item.step }),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: item.title })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground ml-16", children: item.desc }) })
          ] }, item.step)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Never Worry About Training Content Again" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Subscribe to our monthly training packages and keep your team trained, compliant, and safe." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "tel:601-647-1201", children: "Call 601-647-1201" }) }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:garland@cornerstoneriskmgt.com", children: "Email Us" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const complianceData = [
  {
    url: "/",
    location: "Hero Section",
    currentText: "Struggling with ISNetworld or Avetta?",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'Struggling with ISNetworld® or Avetta® compliance?'",
    status: "Updated"
  },
  {
    url: "/",
    location: "Hero - Platforms List",
    currentText: "ISNetworld®",
    issueCategory: "missing ®",
    recommendedAction: "Already includes ® - Verified",
    status: "Updated"
  },
  {
    url: "/",
    location: "Footer",
    currentText: "ISNetworld®",
    issueCategory: "missing disclaimer",
    recommendedAction: "Add trademark disclaimer section",
    status: "Updated"
  },
  {
    url: "/",
    location: "Page Title (SEO)",
    currentText: "ISNetworld & Avetta Compliance Management",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'ISNetworld® & Avetta® Compliance Support Services'",
    status: "Updated"
  },
  {
    url: "/",
    location: "Meta Description",
    currentText: "Struggling with ISNetworld or Avetta?",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'Need help with ISNetworld® or Avetta® compliance?'",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Page Title",
    currentText: "ISNetworld® / Veriforce® / Avetta® Compliance",
    issueCategory: "missing ®",
    recommendedAction: "Already includes ® - Verified",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Hero Section",
    currentText: "ISNetworld® / Veriforce® / Avetta® Compliance Management",
    issueCategory: "missing ®",
    recommendedAction: "Already includes ® - Verified",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Platforms Section",
    currentText: "ISNetworld®",
    issueCategory: "missing disclaimer",
    recommendedAction: "Add TrademarkNotice component below platforms section",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Hero Image Alt Text",
    currentText: "ISNetworld Veriforce Avetta compliance management",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'ISNetworld® Veriforce® Avetta® compliance support services'",
    status: "Updated"
  },
  {
    url: "Global Footer",
    location: "Platforms We Manage List",
    currentText: "ISNetworld®",
    issueCategory: "missing disclaimer",
    recommendedAction: "Add Trademarks section with disclaimer and attribution",
    status: "Updated"
  }
];
const getStatusBadge = (status) => {
  switch (status) {
    case "Updated":
      return /* @__PURE__ */ jsx(Badge, { className: "bg-green-500/10 text-green-600 border-green-500/20", children: "Updated" });
    case "To Do":
      return /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", children: "To Do" });
    case "Needs review":
      return /* @__PURE__ */ jsx(Badge, { className: "bg-orange-500/10 text-orange-600 border-orange-500/20", children: "Needs review" });
    default:
      return /* @__PURE__ */ jsx(Badge, { children: status });
  }
};
const getCategoryBadge = (category) => {
  switch (category) {
    case "missing ®":
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Missing ®" });
    case "improper grammar use":
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Grammar" });
    case "implied affiliation":
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Affiliation" });
    case "logo usage":
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Logo" });
    case "missing disclaimer":
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Disclaimer" });
    default:
      return /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: category });
  }
};
const TrademarkComplianceReport = () => {
  const updatedCount = complianceData.filter((item) => item.status === "Updated").length;
  const todoCount = complianceData.filter((item) => item.status === "To Do").length;
  const reviewCount = complianceData.filter((item) => item.status === "Needs review").length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "ISNetworld® Trademark Compliance Report | Internal" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-grow py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-primary" }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-serif font-bold text-primary", children: "ISNetworld® Trademark Compliance Report" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground max-w-3xl", children: [
            "Internal checklist for tracking trademark compliance across the Cornerstone Risk Management website. Reference: ",
            /* @__PURE__ */ jsx("a", { href: "https://www.isnetworld.com/en/trademark-logo-policy", target: "_blank", rel: "noopener noreferrer", className: "text-accent hover:underline", children: "ISNetworld Trademark & Logo Policy" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8", children: [
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-8 w-8 text-green-500" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: updatedCount }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Updated" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-8 w-8 text-yellow-500" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: todoCount }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "To Do" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "h-8 w-8 text-orange-500" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: reviewCount }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Needs Review" })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "mb-8", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Quick Reference: Trademark Usage Rules" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "From the official ISNetworld Trademark & Logo Policy" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2 text-green-600", children: "✓ Correct Usage" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsx("li", { children: '• Use "ISNetworld®" with ® on first mention per page' }),
                /* @__PURE__ */ jsx("li", { children: '• Use as adjective: "ISNetworld® compliance support services"' }),
                /* @__PURE__ */ jsx("li", { children: "• Include disclaimer where services are marketed" }),
                /* @__PURE__ */ jsx("li", { children: "• Text-only references (no logos without permission)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2 text-red-600", children: "✗ Incorrect Usage" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsx("li", { children: '• "We handle ISNetworld" (used as noun)' }),
                /* @__PURE__ */ jsx("li", { children: '• "ISNetworld setup" (used as noun/verb)' }),
                /* @__PURE__ */ jsx("li", { children: "• Implying endorsement or partnership" }),
                /* @__PURE__ */ jsx("li", { children: "• Using logos without written permission" })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Compliance Audit Details" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "All instances requiring review or update" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { className: "w-[120px]", children: "URL / Page" }),
              /* @__PURE__ */ jsx(TableHead, { className: "w-[120px]", children: "Location" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Current Text / Asset" }),
              /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "Issue" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Recommended Action" }),
              /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: complianceData.map((item, index) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: item.url }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: item.location }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: item.currentText }),
              /* @__PURE__ */ jsx(TableCell, { children: getCategoryBadge(item.issueCategory) }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: item.recommendedAction }),
              /* @__PURE__ */ jsx(TableCell, { children: getStatusBadge(item.status) })
            ] }, index)) })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "mt-8", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Required Disclaimer Text" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Copy these exact phrases for compliance" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm mb-1", children: "Disclaimer:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: '"Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with ISNetworld® or ISN Software Corporation."' })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm mb-1", children: "Attribution:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: '"ISNetworld® is a registered trademark of ISN Software Corporation."' })
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const CAL_LINK$1 = "https://cal.com/garland-brent-wa1zbs/15min";
const About = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "About Cornerstone Risk Management — Safety Consulting & Digital Compliance" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "15 plus years managing ISNetworld, Avetta and Veriforce accounts for 100 plus oil and gas contractors. Gulf Coast based. 24 hour response time."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/about" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow pt-24", children: [
        /* @__PURE__ */ jsx("section", { className: "bg-primary text-primary-foreground py-20 md:py-28", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight", children: "About Cornerstone Risk Management" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-primary-foreground/90 leading-relaxed", children: "With over 15 years of experience, Cornerstone Risk Management provides safety consulting and digital compliance management services for oil and gas contractors across the Gulf Coast and Southeast United States." })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-serif font-bold text-primary mb-6", children: "What We Do" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-6", children: "We manage ISNetworld®, Veriforce®, Avetta®, PEC®, and BROWZ® accounts for 100+ contractors — handling account setup, document uploads, questionnaire responses, and ongoing maintenance so our clients can focus on operations instead of paperwork." }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: "Cornerstone Risk Management maintains a 99% compliance success rate and responds to urgent issues within 24 hours." })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center", children: [
          { icon: Clock, stat: "15+", label: "Years Experience" },
          { icon: Users, stat: "100+", label: "Contractors Managed" },
          { icon: ShieldCheck, stat: "99%", label: "Success Rate" },
          { icon: Award, stat: "24hr", label: "Response Time" }
        ].map((item) => /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsx(item.icon, { className: "h-8 w-8 text-accent mx-auto mb-3" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-serif font-bold text-primary mb-1", children: item.stat }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: item.label })
        ] }, item.label)) }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-8 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: /* @__PURE__ */ jsx(TrademarkNotice, {}) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-20 bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-serif font-bold mb-4", children: "Ready to Get Started?" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto", children: "Book a free 15-minute consultation or request a quote today." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-8", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                asChild: true,
                className: "bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6",
                children: /* @__PURE__ */ jsxs("a", { href: CAL_LINK$1, target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "mr-2 h-5 w-5" }),
                  "Book Free Consultation"
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                asChild: true,
                className: "border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 bg-transparent",
                children: /* @__PURE__ */ jsxs("a", { href: "/#lead-form", children: [
                  "Request a Quote",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80", children: [
            /* @__PURE__ */ jsxs("a", { href: "tel:601-647-1201", className: "flex items-center gap-2 hover:text-primary-foreground transition-colors", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
              "601-647-1201"
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "mailto:garland@cornerstoneriskmgt.com", className: "flex items-center gap-2 hover:text-primary-foreground transition-colors", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
              "garland@cornerstoneriskmgt.com"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const Pricing = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Pricing | Cornerstone Risk Management" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Flat-rate ISNetworld, Avetta, and Veriforce compliance pricing. Setup from $900 per platform. Monthly maintenance from $250. No hourly billing, no surprises."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/pricing" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsx("main", { className: "pt-28", children: /* @__PURE__ */ jsx(PricingSection, {}) }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";
const Contact = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Cornerstone Risk Management — Free Consultation" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Contact Cornerstone Risk Management for a free 15 minute compliance consultation. Call 601-647-1201 or book online. No obligation."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://cornerstoneriskmgt.com/contact" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(NavigationNew, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow pt-24", children: [
        /* @__PURE__ */ jsx("section", { className: "bg-primary text-primary-foreground py-20 md:py-28", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl animate-fade-in", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight", children: "Get in Touch" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-primary-foreground/90 leading-relaxed", children: "Have questions about compliance management? We're here to help. Reach out directly or book a free consultation." })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-primary mb-6", children: "Contact Information" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:601-647-1201",
                  className: "flex items-center gap-3 text-foreground hover:text-primary transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-accent" }),
                    /* @__PURE__ */ jsx("span", { className: "text-lg", children: "601-647-1201" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "mailto:garland@cornerstoneriskmgt.com",
                  className: "flex items-center gap-3 text-foreground hover:text-primary transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-accent" }),
                    /* @__PURE__ */ jsx("span", { className: "text-lg", children: "garland@cornerstoneriskmgt.com" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-accent mt-0.5" }),
                /* @__PURE__ */ jsxs("span", { className: "text-lg", children: [
                  "PO Box 271",
                  /* @__PURE__ */ jsx("br", {}),
                  "Crystal Springs, MS 39059"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/30 rounded-lg p-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif font-bold text-primary mb-4", children: "Book a Free Consultation" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "Schedule a free 15-minute call to discuss your compliance needs — no obligation." }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                asChild: true,
                className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6",
                children: /* @__PURE__ */ jsxs("a", { href: CAL_LINK, target: "_blank", rel: "noopener noreferrer", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "mr-2 h-5 w-5" }),
                  "Schedule a Call"
                ] })
              }
            )
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx(FooterNew, {})
    ] })
  ] });
};
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(App, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(Index, {}), entry: "src/pages/Index.tsx" },
      { path: "about", element: /* @__PURE__ */ jsx(About, {}), entry: "src/pages/About.tsx" },
      { path: "pricing", element: /* @__PURE__ */ jsx(Pricing, {}), entry: "src/pages/Pricing.tsx" },
      { path: "contact", element: /* @__PURE__ */ jsx(Contact, {}), entry: "src/pages/Contact.tsx" },
      { path: "services/safety-program-development", element: /* @__PURE__ */ jsx(SafetyProgramDevelopment, {}), entry: "src/pages/SafetyProgramDevelopment.tsx" },
      { path: "services/regulatory-compliance", element: /* @__PURE__ */ jsx(RegulatoryCompliance, {}), entry: "src/pages/RegulatoryCompliance.tsx" },
      { path: "services/onsite-audits-training", element: /* @__PURE__ */ jsx(OnsiteAuditsTraining, {}), entry: "src/pages/OnsiteAuditsTraining.tsx" },
      { path: "services/risk-consulting", element: /* @__PURE__ */ jsx(RiskConsulting, {}), entry: "src/pages/RiskConsulting.tsx" },
      { path: "services/compliance-platforms", element: /* @__PURE__ */ jsx(CompliancePlatforms, {}), entry: "src/pages/CompliancePlatforms.tsx" },
      { path: "services/isnetworld", element: /* @__PURE__ */ jsx(Isnetworld, {}), entry: "src/pages/Isnetworld.tsx" },
      { path: "isnetworld-help", element: /* @__PURE__ */ jsx(Isnetworld, {}), entry: "src/pages/Isnetworld.tsx" },
      { path: "isnetworld", element: /* @__PURE__ */ jsx(Isnetworld, {}), entry: "src/pages/Isnetworld.tsx" },
      { path: "avetta-help", element: /* @__PURE__ */ jsx(Avetta, {}), entry: "src/pages/Avetta.tsx" },
      { path: "avetta", element: /* @__PURE__ */ jsx(Avetta, {}), entry: "src/pages/Avetta.tsx" },
      { path: "services/avetta", element: /* @__PURE__ */ jsx(Avetta, {}), entry: "src/pages/Avetta.tsx" },
      { path: "veriforce-help", element: /* @__PURE__ */ jsx(Veriforce, {}), entry: "src/pages/Veriforce.tsx" },
      { path: "veriforce", element: /* @__PURE__ */ jsx(Veriforce, {}), entry: "src/pages/Veriforce.tsx" },
      { path: "services/veriforce", element: /* @__PURE__ */ jsx(Veriforce, {}), entry: "src/pages/Veriforce.tsx" },
      { path: "services/safety-management-system", element: /* @__PURE__ */ jsx(SafetyManagementSystem, {}), entry: "src/pages/SafetyManagementSystem.tsx" },
      { path: "services/monthly-training", element: /* @__PURE__ */ jsx(MonthlyTraining, {}), entry: "src/pages/MonthlyTraining.tsx" },
      { path: "internal/trademark-compliance", element: /* @__PURE__ */ jsx(TrademarkComplianceReport, {}), entry: "src/pages/TrademarkComplianceReport.tsx" },
      { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}), entry: "src/pages/NotFound.tsx" }
    ]
  }
];
const createRoot = ViteReactSSG({ routes });
export {
  createRoot
};
