export const readmes = [
  {
    "id": 1,
    "repoId": "todo-app",
    "title": "Todo app",
    "description": "A task management application designed to help organize and prioritize activities efficiently.",
    "imageSrc": "https://i.postimg.cc/RVkst3yt/pc-todo-app-mockup.webp",
    "detailedDescription": "The app allows setting due dates, reminders, and managing task statuses. Now, it also includes a Kanban board with drag-and-drop functionality, allowing tasks to be easily moved between different statuses for better organization.",
    "technologies": [
      "Next.js",
      "React.js",
      "Tailwind",
      "Node.js",
      "Shacdn UI",
      "PostgreSQL",
      "Docker"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/todo-app",
        "label": "GitHub"
      }
    ],
    "gallery": [
      "https://i.postimg.cc/L8jy39Fb/iphone-todo-app-mockup.webp",
      "https://i.postimg.cc/kMhhnYyf/laptop-todo-app-mockup.webp",
      "https://i.postimg.cc/RVkst3yt/pc-todo-app-mockup.webp",
      "https://i.postimg.cc/RV6pq1s9/tablet-todo-app-mockup.webp"
    ],
    "features": [
      "Task management: Create, edit, delete, and mark tasks as completed.",
      "Statuses and priorities: Assign custom statuses and priority levels.",
      "Due dates and reminders: Set due dates and notifications.",
      "Smart date and time selection: Ensures valid time selection based on the chosen date.",
      "Backend synchronization: Data persistence via an API.",
      "Kanban board: Drag-and-drop tasks between different statuses for a visual workflow.",
      "Responsive design with ShadCN UI.",
      "Static site generation with Next.js."
    ],
    "readmeContent": {
      "title": "Todo app",
      "url": "https://raw.githubusercontent.com/deveduar/todo-app/master/README.md",
      "sections": {
        "✨ Features": [
          "📋 **Task management**: Create, edit, delete, and mark tasks as completed.",
          "🎯 **Statuses and priorities**: Assign custom statuses and priority levels.",
          "⏰ **Due dates and reminders**: Set due dates and notifications.",
          "📅 **Smart date and time selection**: Ensures valid time selection based on the chosen date.",
          "🔄 **Backend synchronization**: Data persistence via an API.",
          "📌 **Kanban board**: Drag-and-drop tasks between different statuses for a visual workflow."
        ],
        "🛠️ Technologies Used": {
          "Frontend": [
            "⚛️ **React** with TypeScript",
            "🎨 **Tailwind CSS** for styling",
            "📦 **ShadCN/UI** for UI components",
            "🗂 **date-fns** and **date-fns-tz** for date handling",
            "🖱 **dnd-kit** for drag-and-drop functionality in the Kanban board"
          ],
          "Backend (Separate GitHub Project)": [
            "🚀 **Node.js with Express**",
            "🐘 **PostgreSQL** as the database",
            "🐳 **Docker** for deployment and configuration"
          ]
        },
        "🚀 Installation": {
          "1️⃣ Clone the repository": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "git clone https://github.com/your-user/your-todo-repo.git\ncd your-todo-repo"
            }
          ],
          "2️⃣ Install dependencies": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm install"
            }
          ],
          "3️⃣ Set up the backend (Docker)": [
            "The backend is in a separate GitHub project. Follow its instructions to set it up with Docker."
          ],
          "4️⃣ Run the frontend": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm run dev"
            }
          ]
        },
        "📌 Roadmap": [
          "[ ] Authentication integration",
          "[ ] Support for subtasks",
          "[ ] Real-time notifications",
          "📌 *Contributions and suggestions are welcome.*"
        ]
      }
    }
  },
  {
    "id": 2,
    "repoId": "angular-SGI-front",
    "title": "Inventory System",
    "description": "Inventory management for dropshipping store created with Angular.",
    "imageSrc": "https://i.postimg.cc/xd9MxWZ5/tablet-sgi-mockup.webp",
    "detailedDescription": "Developed with TypeScript, Angular, Node.js.",
    "technologies": [
      "Angular",
      "NodeJS",
      "TypeScript",
      "SASS",
      "Express"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/angular-SGI-front",
        "label": "GitHub Frontend"
      },
      {
        "href": "https://github.com/deveduar/inventory-backend.git",
        "label": "GitHub Backend"
      }
    ],
    "gallery": [
      "https://i.postimg.cc/xd9MxWZ5/tablet-sgi-mockup.webp",
      "https://i.postimg.cc/hGMxH2WB/iphone-sgi-mockup.webp",
      "https://i.postimg.cc/sgY5JVT1/laptop-sgi-mockup.webp"
    ],
    "features": [
      "Backend connection with Printful API.",
      "Responsive design with SASS.",
      "Static site generation with Angular.",
      "Product and category management.",
      "Export data in CSV format.",
      "Authentication and user management.",
      "Orders and suppliers tracking.",
      "Reports and dashboard."
    ],
    "readmeContent": {
      "title": "Inventory System",
      "url": "https://raw.githubusercontent.com/deveduar/angular-SGI-front/master/README.md",
      "sections": {
        "✨ Features": [
          "📦 **Product and category management**: Easily add, edit, and organize products and categories.",
          "🔄 **Backend connection with Printful API**: Sync inventory in real-time.",
          "📄 **Export data in CSV format**: Download inventory reports for external use.",
          "🔐 **Authentication and user management**: Secure access to the system.",
          "📊 **Orders and suppliers tracking**: Manage incoming orders and supplier details.",
          "📈 **Reports and dashboard**: Gain insights into inventory performance.",
          "🎨 **Responsive design**: Optimized for various screen sizes with **SASS** and **PrimeNG**."
        ],
        "🛠️ Technologies Used": {
          "Frontend": [
            "🅰️ **Angular 18**",
            "🎨 **PrimeNG & SASS** for UI and styling"
          ],
          "Backend": [
            "🚀 **Node.js with Express**"
          ]
        },
        "🚀 Installation": {
          "1️⃣ Clone the repositories": [],
          "Frontend": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm run start"
            }
          ],
          "Backend": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm run dev"
            }
          ],
          "2️⃣ Install dependencies": [
            "For both projects, run:",
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm install"
            }
          ],
          "3️⃣ Run the applications": []
        },
        "📌 Roadmap": [
          "[x] Basic frontend",
          "[x] Products and categories management",
          "[x] Export in CSV",
          "[ ] Authentication",
          "[ ] Orders and suppliers integration",
          "[ ] Reports and dashboard",
          "📌 *Contributions and suggestions are welcome.*"
        ]
      }
    }
  },
  {
    "id": 3,
    "repoId": "merakikrea",
    "title": "Merakikrea Cerámica",
    "description": "A landing page inspired by Google Business Profile to showcase store information and facilitate easy contact.",
    "imageSrc": "https://i.postimg.cc/jqJdfFtB/iphone-meraki-mockup.webp",
    "detailedDescription": "An optimized landing page built with Next.js and Tailwind CSS, presenting key information about Merakikrea Cerámica. It includes location details, social media links, opening hours, direct WhatsApp contact, and an Instagram feed.",
    "technologies": [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "ShadCN UI",
      "Framer Motion"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/merakikrea-landing",
        "label": "GitHub"
      },
      {
        "href": "https://meraki-krea-ceramica-six.vercel.app",
        "label": "Live Demo"
      }
    ],
    "gallery": [
      "https://i.postimg.cc/5032x1kZ/pc-meraki-mockup.webp",
      "https://i.postimg.cc/jqJdfFtB/iphone-meraki-mockup.webp",
      "https://i.postimg.cc/8z1HFJbt/laptop-meraki-mockup.webp",
      "https://i.postimg.cc/NjpxRsJY/tablet-meraki-mockup.webp"
    ],
    "features": [
      "Responsive and accessible design.",
      "Light/Dark mode with Tailwind CSS.",
      "Integration with Google Maps and WhatsApp.",
      "SEO optimized for better visibility.",
      "Google reviews and social media section.",
      "Floating WhatsApp button for quick contact."
    ],
    "readmeContent": {
      "title": "Merakikrea Cerámica",
      "url": "https://raw.githubusercontent.com/deveduar/meraki-krea-ceramica/main/README.md",
      "sections": {
        "✨ Features": [
          "✅ **Responsive design** – Adapted for both mobile and desktop.✅ **Light/Dark Mode** – Implemented using **Tailwind CSS**.✅ **SEO and Accessibility** – Optimized for search engines with semantic HTML tags.✅ **Key Sections**:",
          "**About Us** – Information about the store and courses.",
          "**Location** – Integrated with **Google Maps**.",
          "**Instagram Feed** – Displays recent posts from Instagram.",
          "**Google Reviews** – Shows customer reviews.",
          "**Contact** – Buttons for WhatsApp, email, and social media.✅ **Floating WhatsApp button** – Always visible.✅ **Header and Footer** – Intuitive navigation."
        ],
        "🛠️ Technologies Used": [
          "⚛️ **Next.js** (React framework for web applications)",
          "🅾️ **TypeScript** (Safe typing for JavaScript)",
          "🎨 **Tailwind CSS** (Styling and light/dark mode with variables)",
          "📦 **ShadCN UI** (Accessible and modern UI components)",
          "🎬 **Framer Motion** (Smooth and attractive animations)",
          "🗺️ **Google Maps API** (For location display)",
          "📸 **Instagram Feed API** (For displaying recent posts)",
          "🌐 **Vercel** (Hosting and deployment)"
        ]
      }
    }
  },
  {
    "id": 4,
    "repoId": "readme-to-obj",
    "title": "README to Object Converter",
    "description": "A project to convert README.md files from multiple repositories into structured JavaScript objects for easy integration with TypeScript projects.",
    "imageSrc": "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg",
    "detailedDescription": "This project downloads README.md files from specified repositories, processes them to extract key sections (such as headers, paragraphs, lists, and code), and converts them into a JavaScript object. This object contains the sections with their corresponding content and is saved into a .ts file for later use.",
    "technologies": [
      "Node.js",
      "TypeScript",
      "GitHub API",
      "remark"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/readme-to-obj",
        "label": "GitHub Repository"
      }
    ],
    "features": [
      "Downloads README.md files from public GitHub repositories.",
      "Extracts sections such as headers, paragraphs, and lists from Markdown.",
      "Converts extracted content into a structured JavaScript object.",
      "Saves the resulting object in a ts file for TypeScript integration.",
      "Customizable list of repositories to download from.",
      "Supports integration with TypeScript projects for dynamic README usage."
    ],
    "readmeContent": {
      "title": "README to Object Converter",
      "url": "https://raw.githubusercontent.com/deveduar/readme-to-obj/main/README.md",
      "sections": {
        "Description": [
          "The project downloads `README.md` files from specified repositories, processes them to extract key sections (such as headers, paragraphs, lists, and code), and converts them into a JavaScript object. This object contains the sections with their corresponding content and is saved into a `.ts` file for later use. Additionally, it generates an HTML view for each README to visualize its content directly in the browser."
        ],
        "Features": [
          "Downloads `README.md` files from public GitHub repositories.",
          "Automatically extracts sections from the Markdown file.",
          "Converts sections into a structured object.",
          "Saves the result in a `.ts` file for easy integration with TypeScript projects.",
          "You can customize which repositories to download the README from.",
          "**HTML Generation**: Generates HTML to visualize the README files directly in the browser."
        ],
        "Installation": [
          "Clone this repository:",
          "Install the dependencies:"
        ],
        "Usage": {
          "1. Run the Conversion Script": [
            "The `updateReadmes.ts` script is responsible for downloading and converting the `README.md` files from the specified repositories. To run the script, use the following command:",
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm run update-readmes"
            },
            "This will download the `README.md` files, extract the sections, and save the resulting object in `src/data/readmes.ts`."
          ],
          "2. View the HTML": [
            "After running the script, you can also generate an HTML view of each README file by running the following:",
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm run generate-html"
            },
            "This will create an HTML page for each README file that can be viewed directly in a browser."
          ],
          "3. Example Output": [
            "After running the script, the `readmes.ts` file will contain something like this:",
            {
              "type": "code",
              "lang": "ts",
              "meta": null,
              "value": "export const readmes = {\n  \"portfolio\": {\n    title: \"My Portfolio\",\n    sections: {\n      \"Introduction\": \"This is my portfolio...\",\n      \"Technologies\": \"React, Node.js, etc.\",\n      // ...\n    }\n  },\n  \"todo-app\": {\n    title: \"Todo App\",\n    sections: {\n      \"Features\": \"Task management...\",\n      \"Setup\": \"To install...\",\n      // ...\n    }\n  }\n}"
            },
            "The HTML output will be available in the `dist` folder."
          ],
          "4. Include the Data in Your Project": [
            "You can import the `readmes` object into your code:",
            {
              "type": "code",
              "lang": "ts",
              "meta": null,
              "value": "import { readmes } from './data/readmes';\n\nconsole.log(readmes['portfolio']);"
            }
          ]
        },
        "Customization": [
          "You can modify the list of repositories in the `src/scripts/updateReadmes.ts` file by adding or removing repositories. The repository structure is as follows:",
          {
            "type": "code",
            "lang": "ts",
            "meta": null,
            "value": "const repos = [\n  { id: \"repo_id\", url: \"https://raw.githubusercontent.com/user/repo/main/README.md\" },\n  // ...\n];"
          }
        ],
        "Libraries Used": [
          "This project uses the following libraries:",
          "**[remark](https://github.com/remarkjs/remark)** - A Markdown processor for parsing and transforming Markdown.",
          "**[remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse)** - A plugin for remark to parse Markdown into an abstract syntax tree (AST).",
          "**[typescript](https://www.typescriptlang.org/)** - A strict syntactical superset of JavaScript that adds optional static typing.",
          "**[@types/node](https://www.npmjs.com/package/@types/node)** - TypeScript type definitions for Node.js."
        ],
        "Node.js and TypeScript Version Requirements": [
          "Node.js version: **v16.0.0** or higher",
          "TypeScript version: **v5.8.2** or higher"
        ],
        "License": [
          "This project is licensed under the [MIT License](LICENSE)."
        ]
      }
    }
  },
  {
    "id": 5,
    "repoId": "pdf-to-cbr",
    "title": "PDF to CBR Converter",
    "description": "A Python script to convert PDF files to CBR (Comic Book RAR) format, perfect for digital comic and manga readers.",
    "imageSrc": "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg",
    "detailedDescription": "This tool converts PDF files into the CBR format, suitable for comic book and manga readers. It requires Poppler for Windows and Python 3.7+.",
    "technologies": [
      "Python",
      "PDF Conversion",
      "CBR Format",
      "Poppler"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/pdf-to-cbr.git",
        "label": "GitHub Repository"
      }
    ],
    "gallery": [
      "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg"
    ],
    "features": [
      "Converts PDFs to CBR format for digital comic reading.",
      "Supports custom output directories, DPI, and image quality settings.",
      "Easy-to-use command line interface.",
      "Requires Poppler for PDF rendering.",
      "Perfect for manga and comic book digitalization."
    ],
    "readmeContent": {
      "title": "PDF to CBR Converter",
      "url": "https://raw.githubusercontent.com/deveduar/pdf-to-cbr/master/README.md",
      "sections": {
        "Description": [
          "A Python script to convert PDF files to CBR (Comic Book RAR) format, perfect for digital comic and manga readers."
        ],
        "Disclaimer": [
          "This tool is intended for personal and educational use only. Please ensure you have the right to convert and distribute any content with copyright protection. The creator of this script does not condone or take responsibility for any unauthorized use, including the redistribution of copyrighted material."
        ],
        "Prerequisites": {
          "Installation": [
            "Clone the repository:",
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "git clone https://github.com/your-username/pdf-to-cbr.git\ncd pdf-to-cbr"
            },
            "Install dependencies:",
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "pip install -r requirements.txt"
            },
            "Download and Install Poppler:",
            "  - Download Poppler binaries for Windows",
            "  - Extract contents into the project folder"
          ]
        },
        "Usage": {
          "Basic Usage": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "python main.py \"path/to/file.pdf\""
            }
          ],
          "Advanced Options": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "python main.py \"path/to/file.pdf\" --output-dir images --dpi 300 --quality 95"
            }
          ],
          "Parameters": [
            "`path/to/file.pdf`: Path to the PDF file to convert",
            "`--output-dir`: Output directory for images (default: `output`)",
            "`--dpi`: Image resolution (default: 300)",
            "`--quality`: JPEG compression quality (default: 95, range 1-100)"
          ]
        },
        "Examples": {
          "Convert PDF with default settings": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "python main.py \"D:/Manga/chapter1.pdf\""
            }
          ],
          "Convert with custom configuration": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "python main.py \"D:/Manga/chapter2.pdf\" --output-dir my_images --dpi 600 --quality 90"
            }
          ]
        },
        "Roadmap": [
          "[x] Convert to ZIP and CBR",
          "[ ] Loading improvements and color enhancements"
        ],
        "Troubleshooting": [
          "Ensure Poppler is correctly installed and added to system PATH",
          "Check Python version compatibility",
          "Verify input PDF file integrity"
        ],
        "Contributing": [
          "Contributions are welcome! Please:",
          "Open an issue to discuss proposed changes",
          "Create a pull request with detailed description",
          "Follow project coding standards"
        ]
      }
    }
  },
  {
    "id": 6,
    "repoId": "portfolio",
    "title": "My Portfolio",
    "description": "A Single Page Application (SPA) developed with Next.js 14, TypeScript, and Tailwind CSS to showcase my projects, skills, and experience.",
    "imageSrc": "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg",
    "detailedDescription": "A modern portfolio built using Next.js 14, TypeScript, and Tailwind CSS. It features a project showcase, interactive modals, dark mode support, and performance optimizations.",
    "technologies": [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Vercel"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/nextjs-portfolio.git",
        "label": "GitHub Repository"
      },
      {
        "href": "https://deveduar-portfolio.vercel.app",
        "label": "Live Demo"
      }
    ],
    "gallery": [
      "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg"
    ],
    "features": [
      "Modern UI/UX with responsive design.",
      "Dynamic project listing with details.",
      "Optimized performance using next/image.",
      "Interactive modals for project details.",
      "Secure contact form.",
      "Dark mode support.",
      "Fully responsive design for all devices.",
      "Deployed on Vercel for fast and reliable hosting."
    ],
    "readmeContent": {
      "title": "My Portfolio",
      "url": "https://raw.githubusercontent.com/deveduar/nextjs-portfolio/main/README.md",
      "sections": {
        "🌟 Features": [
          "✅ **Modern UI/UX** – Responsive and clean design.",
          "✅ **Project showcase** – Dynamic project listing with details.",
          "✅ **Optimized performance** – Uses `next/image` for fast loading.",
          "✅ **Interactive modal** – View project details in a modal.",
          "✅ **Contact form** – Securely send messages directly.",
          "✅ **Dark Mode** – Supports light and dark themes.",
          "✅ **Fully Responsive** – Works seamlessly on all devices.",
          "✅ **Deployed on Vercel** – Fast and reliable hosting."
        ],
        "🛠️ Tech Stack": [
          "**Next.js 14** – App router & server components",
          "**TypeScript** – Strongly typed codebase",
          "**Tailwind CSS** – Utility-first styling",
          "**Vercel** – Deployment and hosting"
        ],
        "🚀 Getting Started": {
          "1️⃣ Clone the repository": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "git clone https://github.com/deveduar/nextjs-portfolio.git\ncd your-portfolio"
            }
          ],
          "2️⃣ Install dependencies": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm install\n# or\nyarn install"
            }
          ],
          "3️⃣ Run the development server": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "npm run dev\n# or\nyarn dev"
            },
            "Open **[http://localhost:3000](http://localhost:3000)** to view in the browser."
          ]
        },
        "🔗 Live Demo": [
          "🔴 **Check it out live:** [deveduar-portfolio.vercel.app](https://deveduar-portfolio.vercel.app/)"
        ],
        "📌 Future Improvements": [
          "📌 Add API to dynamically manage projects.",
          "📌 Implement filtering and search for projects.",
          "📌 Improve accessibility and mobile gestures."
        ],
        "📞 Contact": [
          "If you have any questions or feedback, feel free to reach out!"
        ],
        "📝 License": [
          "This project is **MIT licensed**. Feel free to use and modify it!"
        ]
      }
    }
  },
  {
    "id": 7,
    "repoId": "you-mp3-python",
    "title": "YouTube MP3 Downloader",
    "description": "A Python script to download audio from YouTube videos in MP3 format at 320kbps using yt-dlp and ffmpeg.",
    "imageSrc": "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg",
    "detailedDescription": "This Python script downloads audio from YouTube videos, converts it to MP3 at 320kbps, and saves it in an output folder with sanitized filenames. It uses yt-dlp for downloading and ffmpeg for conversion.",
    "technologies": [
      "Python",
      "yt-dlp",
      "ffmpeg",
      "Scripting",
      "Automation"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/you-mp3-python",
        "label": "GitHub Repository",
        "svg": "GitHubIcon"
      }
    ],
    "gallery": [
      "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg"
    ],
    "features": [
      "Efficiently download and convert multiple YouTube videos to MP3 at 320kbps.",
      "Sanitize filenames to avoid invalid characters on Windows.",
      "Organize MP3 files in the 'output' folder.",
      "Supports batch download of multiple YouTube URLs."
    ],
    "readmeContent": {
      "title": "YouTube MP3 Downloader",
      "url": "https://raw.githubusercontent.com/deveduar/you-mp3-python/master/README.md",
      "sections": {
        "Requirements": [
          "Python 3.x",
          "`yt-dlp`: For downloading YouTube videos.",
          "`ffmpeg`: For converting audio files to MP3."
        ],
        "Installation": {
          "1. Clone this repository": [
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "git clone https://github.com/yourusername/py-mp3-you.git\ncd py-mp3-you"
            }
          ],
          "2. Install dependencies": [
            "Make sure Python is installed, and then install the required Python packages. You can use the `requirements.txt` file provided:",
            {
              "type": "code",
              "lang": "bash",
              "meta": null,
              "value": "pip install -r requirements.txt"
            },
            "This will install all necessary dependencies, including `yt-dlp`."
          ],
          "3. Download and install ": [
            "You can download `ffmpeg` from the [official website](https://ffmpeg.org/download.html).",
            "If you are using Windows, make sure to add the `ffmpeg` path to your `PATH` environment variable, or place the `ffmpeg.exe` binary in a folder within your project and modify the path in the script."
          ],
          "4. Project Structure": [
            "The project should have the following folder structure:",
            {
              "type": "code",
              "lang": null,
              "meta": null,
              "value": "py-mp3-you/\n├── ffmpeg/                   # Folder containing the ffmpeg binary\n│   └── bin/\n│       └── ffmpeg.exe         # ffmpeg executable\n├── output/                   # Folder where the downloaded MP3s will be saved\n├── script.py                 # Python script for downloading and converting\n├── requirements.txt          # File containing the Python dependencies\n└── README.md                 # This file"
            }
          ]
        },
        "Usage": [
          "Run the script with the following command:",
          {
            "type": "code",
            "lang": "bash",
            "meta": null,
            "value": "python script.py"
          },
          "The script will ask you to enter the YouTube video URL(s) separated by commas. For example:",
          {
            "type": "code",
            "lang": null,
            "meta": null,
            "value": "https://www.youtube.com/watch?v=abc123, https://www.youtube.com/watch?v=xyz456"
          },
          "The script will download the audio in the best available format, convert it to MP3 at 320kbps, and save it in the `output` folder with the video title, removing invalid characters."
        ],
        "Features": [
          "Efficiently downloads and converts multiple YouTube videos to MP3.",
          "Sanitizes filenames to avoid issues with invalid characters on Windows.",
          "The converted MP3 files are organized and saved in an `output` folder."
        ],
        "Contributions": [
          "If you have suggestions or improvements, feel free to create a pull request or open an issue."
        ],
        "Disclaimer": [
          "This script is intended for educational purposes only. The author does not condone or encourage the downloading of copyrighted material without permission. It is the responsibility of the user to ensure they comply with local laws and the terms of service of YouTube or any other platform they are using the script with.",
          "The author will not be held liable for any misuse of this tool or for any legal consequences that arise from its use."
        ],
        "License": [
          "MIT License. See the LICENSE file for more details."
        ]
      }
    }
  },
  {
    "id": 8,
    "repoId": "omnivore-to-raindrop",
    "title": "Omnivore JSON to Raindrop.io CSV Converter",
    "description": "A Python script to convert Omnivore JSON exports to CSV format for easy migration to Raindrop.io.",
    "imageSrc": "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg",
    "detailedDescription": "This Python script helps users convert JSON files exported from Omnivore into CSV format, making them compatible with Raindrop.io. It allows easy migration of data as Omnivore is scheduled to shut down.",
    "technologies": [
      "Python",
      "Scripting",
      "Automation",
      "Data Conversion"
    ],
    "links": [
      {
        "href": "https://github.com/deveduar/omnivore-to-raindrop",
        "label": "Omnivore to Raindrop GitHub Repository"
      }
    ],
    "gallery": [
      "https://i.postimg.cc/HLT5MH2H/artem-sapegin-b18-TRXc8-UPQ-unsplash.jpg"
    ],
    "features": [
      "Converts Omnivore JSON exports to CSV format.",
      "Supports UTF-8 encoding for correct display of text data.",
      "Batch processing of multiple JSON files based on filename pattern.",
      "Generates CSV file compatible with Raindrop.io for easy import."
    ],
    "readmeContent": {
      "title": "Omnivore JSON to Raindrop.io CSV Converter",
      "url": "https://raw.githubusercontent.com/deveduar/omnivore-to-raindrop/master/README.md",
      "sections": {
        "Prerequisites": [
          "**Python 3**: Ensure that you have Python 3 installed. You can check your Python version by running:"
        ],
        "Features": [
          "Converts Omnivore JSON exports to a CSV file.",
          "Compatible with UTF-8 encoding, so text data displays correctly.",
          "Processes multiple JSON files based on a filename pattern, allowing batch conversion."
        ],
        "Installation": [
          "Clone this repository or download the `convert.py` script.",
          "Place the script in a directory where your exported JSON files from Omnivore are located."
        ],
        "Usage": {
          "Output": [
            "The script will generate a CSV file named `metadata.csv` in the same directory.",
            "This file can be imported into Raindrop.io or other applications that accept CSV imports."
          ]
        },
        "CSV Structure": [
          "The output CSV file includes the following columns:",
          "| Column    | Description                       |\n|-----------|-----------------------------------|\n| url       | The URL associated with the item  |\n| title     | The title of the item             |\n| tags      | Comma-separated tags              |\n| note      | Notes or description              |\n| created   | The creation date of the item     |"
        ],
        "Example": [
          "Here’s how to use the script for multiple JSON files matching the pattern `metadata_*.json`:",
          {
            "type": "code",
            "lang": "bash",
            "meta": null,
            "value": "python3 convert.py \"metadata_*.json\""
          },
          "Upon successful completion, you should see a message indicating the total number of records processed and that `metadata.csv` has been created."
        ],
        "Error Handling": [
          "If a JSON file cannot be processed (for example, if it is corrupted), an error message will be displayed, and the script will continue processing the remaining files."
        ],
        "Notes": [
          "Ensure that all Omnivore export files are saved in UTF-8 format to avoid encoding issues.",
          "Open `metadata.csv` with a UTF-8 compatible editor, such as Excel or LibreOffice, to ensure proper display of special characters."
        ]
      }
    }
  }
];
