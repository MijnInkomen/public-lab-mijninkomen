/**
 * Do not edit directly
 * Generated on Thu, 29 Oct 2026 19:51:10 GMT
 */

export default tokens;

declare interface DesignToken {
  value: any;
  name?: string;
  comment?: string;
  themeable?: boolean;
  attributes?: {
    category?: string;
    type?: string;
    item?: string;
    subitem?: string;
    state?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

declare const tokens: {
  "nlds": {
    "typography": {
      "default": {
        "font-family": DesignToken
      },
      "alternative": {
        "font-family": DesignToken
      },
      "monospace": {
        "font-family": DesignToken
      }
    },
    "status": {
      "border-color": DesignToken,
      "help-wanted": {
        "background-color": DesignToken,
        "color": DesignToken
      },
      "community": {
        "background-color": DesignToken,
        "color": DesignToken
      },
      "unstable": {
        "background-color": DesignToken,
        "color": DesignToken
      },
      "stable": {
        "background-color": DesignToken,
        "color": DesignToken
      }
    },
    "invalid": {
      "color": DesignToken
    },
    "valid": {
      "color": DesignToken
    },
    "focus": {
      "background-color": DesignToken,
      "color": DesignToken,
      "outline-color": DesignToken,
      "inverse-outline-color": DesignToken,
      "outline-style": DesignToken,
      "outline-width": DesignToken,
      "outline-offset": DesignToken
    },
    "document": {
      "background-color": DesignToken,
      "color": DesignToken,
      "inverse": {
        "background-color": DesignToken,
        "color": DesignToken
      },
      "subtle": {
        "color": DesignToken
      }
    },
    "container": {
      "border-color": DesignToken
    },
    "interaction": {
      "color": DesignToken
    },
    "page-header": {
      "background-color": DesignToken
    },
    "mobile-sidebar": {
      "background-color": DesignToken
    },
    "menu-item": {
      "selected": {
        "background-color": DesignToken
      }
    }
  },
  "utrecht": {
    "focus": {
      "outline-width": DesignToken,
      "inverse-outline-color": DesignToken,
      "outline-color": DesignToken,
      "background-color": DesignToken,
      "color": DesignToken,
      "outline-style": DesignToken,
      "outline-offset": DesignToken
    },
    "space-around": DesignToken,
    "actions": {
      "activate": {
        "cursor": DesignToken
      }
    },
    "article": {
      "max-inline-size": DesignToken
    },
    "document": {
      "background-color": DesignToken,
      "color": DesignToken,
      "font-family": DesignToken,
      "font-size": DesignToken,
      "line-height": DesignToken
    },
    "link": {
      "color": DesignToken,
      "text-decoration-color": DesignToken,
      "text-underline-offset": DesignToken,
      "text-decoration-thickness": DesignToken,
      "hover": {
        "text-decoration-thickness": DesignToken
      },
      "focus": {
        "background-color": DesignToken,
        "color": DesignToken
      }
    },
    "button": {
      "color": DesignToken,
      "font-weight": DesignToken,
      "font-size": DesignToken,
      "border-radius": DesignToken,
      "line-height": DesignToken,
      "padding-block-start": DesignToken,
      "padding-block-end": DesignToken,
      "padding-inline-start": DesignToken,
      "padding-inline-end": DesignToken,
      "icon": {
        "size": DesignToken
      },
      "focus": {
        "background-color": DesignToken,
        "color": DesignToken
      },
      "primary-action": {
        "border-color": DesignToken,
        "background-color": DesignToken,
        "color": DesignToken,
        "hover": {},
        "focus": {
          "background-color": DesignToken,
          "color": DesignToken
        }
      },
      "secondary-action": {
        "background-color": DesignToken,
        "border-color": DesignToken,
        "color": DesignToken,
        "hover": {},
        "focus": {
          "background-color": DesignToken,
          "color": DesignToken
        }
      },
      "subtle": {
        "focus": {
          "background-color": DesignToken,
          "color": DesignToken
        }
      }
    },
    "badge": {
      "background-color": DesignToken,
      "color": DesignToken,
      "border-radius": DesignToken,
      "font-size": DesignToken
    },
    "breadcrumb-nav": {
      "min-block-size": {},
      "font-family": {},
      "font-size": {},
      "text-transform": {},
      "item": {
        "padding-block-start": DesignToken,
        "padding-block-end": DesignToken,
        "padding-inline-end": DesignToken,
        "padding-inline-start": DesignToken
      },
      "link": {
        "color": DesignToken,
        "focus": {
          "color": DesignToken
        },
        "current": {
          "font-weight": {}
        },
        "disabled": {
          "color": DesignToken
        }
      },
      "separator": {
        "color": DesignToken,
        "inline-size": DesignToken,
        "icon": {
          "size": {}
        }
      }
    },
    "code": {
      "font-family": DesignToken
    },
    "code-block": {
      "font-size": DesignToken,
      "line-height": DesignToken,
      "padding-block-end": DesignToken,
      "padding-block-start": DesignToken,
      "padding-inline-end": DesignToken,
      "padding-inline-start": DesignToken,
      "margin-block-end": DesignToken
    },
    "color-sample": {
      "border-color": DesignToken,
      "border-width": DesignToken
    },
    "paragraph": {
      "font-size": DesignToken,
      "margin-block-start": DesignToken,
      "line-height": DesignToken,
      "lead": {
        "font-size": DesignToken
      }
    },
    "heading": {
      "font-family": DesignToken,
      "font-weight": DesignToken
    },
    "heading-1": {
      "font-size": DesignToken,
      "margin-block-start": DesignToken,
      "margin-block-end": DesignToken,
      "line-height": DesignToken
    },
    "heading-2": {
      "font-size": DesignToken,
      "margin-block-start": DesignToken,
      "margin-block-end": DesignToken
    },
    "heading-3": {
      "font-size": DesignToken,
      "margin-block-start": DesignToken,
      "margin-block-end": DesignToken
    },
    "heading-4": {
      "font-size": DesignToken,
      "margin-block-start": DesignToken,
      "margin-block-end": DesignToken
    },
    "heading-5": {
      "font-size": DesignToken,
      "margin-block-start": DesignToken,
      "margin-block-end": DesignToken
    },
    "heading-6": {
      "font-size": DesignToken,
      "margin-block-start": DesignToken,
      "margin-block-end": DesignToken
    },
    "unordered-list": {
      "margin-block-start": DesignToken,
      "item": {
        "line-height": DesignToken,
        "margin-block-start": DesignToken
      }
    },
    "ordered-list": {
      "margin-block-start": DesignToken,
      "item": {
        "line-height": DesignToken,
        "margin-block-start": DesignToken
      }
    },
    "page": {
      "padding-inline-start": DesignToken,
      "padding-inline-end": DesignToken
    },
    "page-content": {
      "padding-block-end": DesignToken
    },
    "page-footer": {
      "background-color": DesignToken,
      "color": DesignToken
    },
    "spotlight-section": {
      "background-color": DesignToken,
      "padding-block-end": DesignToken,
      "padding-block-start": DesignToken,
      "padding-inline-end": DesignToken,
      "padding-inline-start": DesignToken
    },
    "table": {
      "border-color": DesignToken,
      "border-width": DesignToken,
      "font-family": {},
      "font-size": {},
      "line-height": {},
      "margin-block-end": {},
      "margin-block-start": {},
      "caption": {
        "font-weight": {},
        "font-family": {},
        "font-size": {},
        "color": {},
        "line-height": {},
        "text-align": {},
        "margin-block-end": {}
      },
      "header": {
        "font-weight": {},
        "background-color": {},
        "color": {},
        "text-transform": {},
        "border-block-end-color": DesignToken,
        "border-block-end-width": DesignToken
      },
      "header-cell": {
        "font-size": {},
        "font-weight": DesignToken,
        "color": {},
        "text-transform": {}
      },
      "cell": {
        "line-height": {},
        "padding-block-end": DesignToken,
        "padding-block-start": DesignToken,
        "padding-inline-end": DesignToken,
        "padding-inline-start": DesignToken,
        "icon": {
          "size": DesignToken
        }
      },
      "row": {
        "border-block-end-color": DesignToken,
        "border-block-end-width": DesignToken,
        "padding-inline-end": DesignToken,
        "padding-inline-start": DesignToken,
        "alternate-odd": {
          "background-color": {},
          "color": {}
        },
        "alternate-even": {
          "background-color": {},
          "color": {}
        }
      }
    }
  },
  "ifm": {
    "color": {
      "primary": DesignToken,
      "primary-dark": DesignToken,
      "primary-darker": DesignToken,
      "primary-darkest": DesignToken,
      "primary-light": DesignToken,
      "primary-lighter": DesignToken,
      "primary-lightest": DesignToken
    },
    "background-color": DesignToken,
    "code": {
      "font-size": DesignToken,
      "border-radius": DesignToken
    },
    "heading": {
      "font-weight": DesignToken,
      "font-family": DesignToken
    },
    "h1": {
      "font-size": DesignToken
    },
    "footer": {
      "padding-vertical": DesignToken,
      "padding-horizontal": DesignToken,
      "background-color": DesignToken,
      "color": DesignToken,
      "link": {
        "hover": {
          "color": DesignToken
        }
      }
    },
    "font-weight": {
      "semibold": DesignToken,
      "bold": DesignToken
    },
    "font-family": {
      "base": DesignToken
    },
    "link": {
      "color": DesignToken,
      "decoration": DesignToken
    },
    "button": {
      "color": DesignToken,
      "font-weight": DesignToken,
      "border-radius": DesignToken,
      "padding-vertical": DesignToken,
      "padding-horizontal": DesignToken
    },
    "navbar": {
      "background-color": DesignToken,
      "padding-vertical": DesignToken,
      "link": {
        "hover": {
          "color": DesignToken
        }
      }
    }
  }
}
