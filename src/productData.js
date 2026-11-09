// FULL PAGE CONTENT FOR EACH OF THE 7 PRODUCTS - edit any text freely.
// Keys match the ids in data.js. Every page is built from these fields:
//   head      big headline in the page banner
//   what      "What is it" paragraphs
//   fixes     [problem today, how the product fixes it]
//   modules   [name, explanation, [bullet points]]  -> shown as clickable tabs
//   steps     [title, text]                         -> "How it works"
//   who       [who, why]                            -> "Built for"
//   wins      [headline, text]                      -> "What changes for you"
//   faq       [question, answer]

export const PD = {
  erp: {
    head: "Run the whole business from one screen",
    what: [
      "An ERP (Enterprise Resource Planning) system connects every department of your company to one shared database. When sales raises an order, stock is reserved, purchasing is alerted, accounts is updated and the warehouse sees what to ship - without anyone retyping the same data in four different places.",
      "Mosbee ERP is built for growing businesses that have outgrown spreadsheets and separate tools. You switch on only the modules you need today and add more as you grow.",
    ],
    fixes: [
      ["Stock numbers in Excel never match the shelf", "Live inventory that updates on every purchase, sale and transfer"],
      ["Sales, purchase and accounts teams work in separate files", "One connected record from quotation to payment"],
      ["Owners wait days for month-end figures", "Dashboards and reports available any time"],
      ["Approvals happen on WhatsApp and are forgotten", "Built-in approval flows with a clear history"],
    ],
    modules: [
      ["Inventory", "Track every item across warehouses and branches in real time.", ["Multi-warehouse stock and transfers", "Batch, serial number and expiry tracking", "Reorder alerts before you run out", "Barcode-ready item labels"]],
      ["Sales", "Take the order from quotation to invoice and delivery in one flow.", ["Quotations, sales orders and invoices", "Customer price lists and discounts", "Delivery notes and returns", "Customer-wise outstanding view"]],
      ["Purchase", "Buy from the right supplier at the right price, and know what is on its way.", ["Purchase requests and orders", "Supplier comparison", "Goods receipt checked against the order", "Supplier payment tracking"]],
      ["Manufacturing", "Plan production with bills of material and see raw material use.", ["Bill of materials per product", "Work orders and production status", "Raw material consumption", "Cost per finished item"]],
      ["Finance link", "Every transaction posts to the books automatically.", ["Automatic ledger entries", "Receivables and payables", "Tax-ready invoices", "Bank reconciliation support"]],
      ["Reports", "See the numbers that matter without asking anyone to prepare them.", ["Sales, stock and purchase reports", "Profit by product, customer or branch", "Export to Excel and PDF", "Role-based dashboards"]],
    ],
    steps: [
      ["Map your process", "We study how orders, stock and billing currently move through your company."],
      ["Configure", "Modules, approval rules, taxes and user roles are set up to match."],
      ["Move your data", "Items, customers, suppliers and opening balances are imported and checked."],
      ["Train and go live", "Your team is trained on real examples and supported through the first weeks."],
    ],
    who: [
      ["Trading and distribution", "Many items, many suppliers, constant stock movement."],
      ["Manufacturers", "Raw material, production and finished goods in one place."],
      ["Retail chains", "Branch-wise stock, sales and transfers."],
      ["Service and contracting firms", "Purchases, projects and billing under one roof."],
    ],
    wins: [
      ["One version of the truth", "Every department sees the same live numbers."],
      ["Less manual entry", "Data is typed once and flows everywhere it is needed."],
      ["Better decisions", "Owners see stock, profit and dues without waiting for reports."],
    ],
    faq: [
      ["Can we start with only a few modules?", "Yes. Most clients begin with inventory, sales and purchase and add other modules later without changing systems."],
      ["Can it handle more than one branch or warehouse?", "Yes. Stock, users and reports can be separated or combined by branch."],
      ["Can our existing data be imported?", "Yes. We import items, customers, suppliers and balances from Excel or your current software."],
      ["Do you provide training and support?", "Yes. Training is part of go-live, and support continues after launch."],
    ],
  },

  hrms: {
    head: "Manage your people without the paperwork",
    what: [
      "An HRMS (Human Resource Management System) keeps everything about your employees - joining details, attendance, leave, salary and performance - in one secure place. Instead of registers, spreadsheets and chasing messages, HR works from a single system and employees help themselves.",
      "Mosbee HRMS covers the full journey of an employee, from the first interview to the final settlement, and calculates payroll from real attendance and leave data.",
    ],
    fixes: [
      ["Attendance is marked on paper and totalled by hand", "Digital attendance feeds straight into payroll"],
      ["Leave requests are lost in calls and messages", "Apply, approve and track leave online"],
      ["Salary calculation takes days and invites mistakes", "Payroll runs from attendance, leave and salary rules"],
      ["Employee documents are scattered in folders", "One secure profile for every employee"],
    ],
    modules: [
      ["Employee records", "A complete digital file for every person in the company.", ["Personal, job and bank details", "Documents with expiry reminders", "Department and reporting structure", "Full history of changes"]],
      ["Attendance", "Know who is in, who is late and who is on leave.", ["Web and mobile check-in", "Shift and roster planning", "Late, early-exit and overtime rules", "Monthly attendance summary"]],
      ["Leave", "Clear rules, quick approvals, no confusion about balances.", ["Leave types and yearly balances", "Request and approval workflow", "Holiday calendar", "Team leave calendar for managers"]],
      ["Payroll", "Accurate salary every month with payslips ready to send.", ["Earnings, deductions and allowances", "Attendance-linked salary calculation", "Loans and advances", "Payslips by email and bank export file"]],
      ["Recruitment", "Hire in an organised way instead of from an inbox.", ["Job openings and applicant list", "Interview stages and notes", "Offer letters", "Convert a hired candidate to an employee in one click"]],
      ["Performance", "Set goals, review progress and keep feedback on record.", ["Goals per employee", "Periodic review forms", "Manager and self-assessment", "Appraisal history"]],
    ],
    steps: [
      ["Set up the company", "Departments, designations, shifts and leave rules are created."],
      ["Add your people", "Employee data is imported and documents are attached."],
      ["Connect attendance and salary", "Pay rules are defined and tested on a sample month."],
      ["Launch to employees", "Staff get their own login to view payslips and apply for leave."],
    ],
    who: [
      ["Growing companies", "Past the stage where one person can track everything manually."],
      ["Multi-branch businesses", "Staff in several locations with one HR team."],
      ["Shift-based teams", "Hospitals, retail, security and factories."],
      ["Staffing and service firms", "Frequent hiring and onboarding."],
    ],
    wins: [
      ["Payroll without panic", "Salary is calculated from data already in the system."],
      ["Fewer HR queries", "Employees check balances and payslips themselves."],
      ["Records you can trust", "Every approval and change is logged."],
    ],
    faq: [
      ["Can employees use it from their phone?", "Yes. The employee portal works on mobile browsers for attendance, leave and payslips."],
      ["Can we set our own salary structure?", "Yes. Earnings, deductions and rules are fully configurable."],
      ["Does it work with biometric devices?", "Attendance data from supported devices can be integrated. Tell us your device model and we will confirm."],
      ["Is employee data secure?", "Access is role-based, so people see only what their role allows."],
    ],
  },

  accounting: {
    head: "Books that stay accurate and always ready",
    what: [
      "Accounting software records every rupee that comes in and goes out, and turns it into invoices, ledgers, statements and tax reports. It replaces the spreadsheets, notebooks and last-minute month-end rush with books that are up to date every day.",
      "Mosbee Accounting is made for business owners and accountants who want correct figures, clear receivable and payable tracking, and tax reports they can file without rebuilding the data.",
    ],
    fixes: [
      ["Invoices are made in Word or Excel and numbered by hand", "Professional invoices with automatic numbering and tax"],
      ["Nobody knows exactly who owes what", "Live outstanding by customer and supplier, with ageing"],
      ["Tax filing means weeks of rework", "Tax reports built from the day-to-day entries"],
      ["The accountant is the only person who sees the numbers", "Role-based access for owner, accountant and staff"],
    ],
    modules: [
      ["Invoicing", "Create, send and track invoices in minutes.", ["Tax invoices, quotes and credit notes", "Recurring invoices", "Send by email or share as PDF", "Mark as paid, partly paid or overdue"]],
      ["Ledgers and vouchers", "The core double-entry books, kept simple to use.", ["Chart of accounts", "Receipt, payment, journal and contra vouchers", "Ledger and day book", "Trial balance"]],
      ["Receivables and payables", "Collect on time and pay on time.", ["Customer and supplier outstanding", "Ageing analysis", "Payment reminders", "Settlement against invoices"]],
      ["Banking", "Match the books with the bank.", ["Multiple bank and cash accounts", "Statement import", "Reconciliation", "Cheque tracking"]],
      ["Tax reports", "Be ready when filing time comes.", ["GST / VAT summaries", "Input and output tax", "Tax-wise sales and purchase registers", "Export for filing"]],
      ["Financial statements", "The reports lenders, partners and owners ask for.", ["Profit and loss", "Balance sheet", "Cash flow view", "Period and branch comparison"]],
    ],
    steps: [
      ["Set up your books", "Company details, tax settings and chart of accounts are prepared."],
      ["Bring in opening balances", "Ledgers, customers, suppliers and bank balances are entered and verified."],
      ["Start daily entries", "Invoices and vouchers are recorded as business happens."],
      ["Review and file", "Check statements and export tax reports each period."],
    ],
    who: [
      ["Small and medium businesses", "Need proper books without an expensive setup."],
      ["Traders and shops", "Fast billing and clear customer dues."],
      ["Service providers", "Recurring invoices and payment follow-up."],
      ["Accountants and CAs", "Manage several clients' books from one place."],
    ],
    wins: [
      ["Know who owes you", "Overdue payments are visible and chased on time."],
      ["Stress-free tax time", "Reports are ready because entries were right from day one."],
      ["Numbers you can show", "Statements ready for banks, investors and partners."],
    ],
    faq: [
      ["Does it support GST or VAT?", "Yes. Tax rates and reports can be configured for the country you operate in."],
      ["Can my accountant log in separately?", "Yes. You can give your accountant their own login with the access you choose."],
      ["Can I move from my old accounting software?", "Yes. We help import ledgers, opening balances and master data."],
      ["Does it link with the ERP?", "Yes. When you use the ERP, sales and purchases post to the accounts automatically."],
    ],
  },

  chatbot: {
    head: "A team member that answers at 3 a.m.",
    what: [
      "A chatbot is an automated assistant that talks to your customers on your website or messaging apps. It answers common questions instantly, collects contact details, and hands the conversation to a person when a human touch is needed.",
      "Mosbee Chatbot is trained on your own business information - services, prices, policies and FAQs - so it replies in your tone with answers that are actually about your company.",
    ],
    fixes: [
      ["Visitors leave because nobody replies after office hours", "Instant replies, day and night"],
      ["Staff answer the same ten questions all day", "The bot handles repeat questions, staff handle real conversations"],
      ["Enquiries are lost when forms are not filled", "Leads are captured naturally inside the chat"],
      ["No record of what customers ask", "Conversation reports show what people want to know"],
    ],
    modules: [
      ["Smart replies", "Understands the question, not just keywords.", ["Trained on your content and FAQs", "Handles spelling mistakes and different phrasing", "Replies in your brand tone", "Multiple languages on request"]],
      ["Lead capture", "Turns visitors into contacts.", ["Asks for name, phone and requirement in the flow", "Sends new leads to your email or CRM", "Qualifies leads with quick questions", "Works outside office hours"]],
      ["Human handover", "Passes complex cases to your team smoothly.", ["Live agent takeover", "Full chat history shown to the agent", "Office-hours routing", "Notification to the right person"]],
      ["Channels", "Be where your customers already are.", ["Website chat widget", "WhatsApp and other messaging apps (subject to provider approval)", "Mobile app embedding", "One inbox for all channels"]],
      ["Integrations", "Connect the bot to the tools you use.", ["CRM and spreadsheet sync", "Booking and order status lookup", "Email notifications", "Custom API connections"]],
      ["Insights", "Learn from every conversation.", ["Most asked questions", "Unanswered questions to improve the bot", "Leads per day or channel", "Satisfaction feedback"]],
    ],
    steps: [
      ["Collect your knowledge", "We gather your FAQs, service details, prices and policies."],
      ["Design the conversation", "Greeting, flows, lead questions and handover rules are planned."],
      ["Train and test", "The bot is tested on real customer questions and refined."],
      ["Go live and improve", "It is added to your site and tuned using real chat data."],
    ],
    who: [
      ["Service businesses", "Answer pricing and availability questions instantly."],
      ["Online stores", "Help with orders, delivery and returns."],
      ["Education and training", "Handle admission and course enquiries."],
      ["Real estate and clinics", "Capture enquiries and book appointments."],
    ],
    wins: [
      ["Never miss an enquiry", "Every visitor gets an answer straight away."],
      ["Lower support load", "Your team focuses on conversations that need a person."],
      ["More qualified leads", "Contacts arrive with their requirement already noted."],
    ],
    faq: [
      ["Will it sound robotic?", "It is written in your brand tone and trained on your content, so replies are natural and specific to your business."],
      ["What if it does not know the answer?", "It says so, offers to connect a person, and logs the question so you can improve it."],
      ["Can it run on WhatsApp?", "Yes, through an approved business messaging provider. We guide you through the setup."],
      ["Can we edit its answers ourselves?", "Yes. You can update answers and add new questions at any time."],
    ],
  },

  "project-management": {
    head: "Deliver projects on time, every time",
    what: [
      "Project management software gives everyone on a project the same plan: what has to be done, by whom, by when and how far along it is. Managers see problems early, and teams stop wasting time in status meetings.",
      "Mosbee Project Management helps you break large work into phases, assign responsibility, watch deadlines and share progress with clients and management in clear reports.",
    ],
    fixes: [
      ["Deadlines slip and nobody noticed until too late", "Timelines with warnings when work is falling behind"],
      ["Status needs a meeting or a long message chain", "Live progress anyone can open"],
      ["Files and feedback are spread across chats and email", "Documents and comments kept on each project"],
      ["Hard to know if the project is making money", "Budget and effort tracked against plan"],
    ],
    modules: [
      ["Planning and timelines", "Turn a goal into phases, milestones and dates.", ["Phases, milestones and dependencies", "Gantt-style timeline view", "Reusable project templates", "Baseline vs actual dates"]],
      ["Team collaboration", "Keep discussion where the work is.", ["Comments on tasks and milestones", "Shared files and versions", "Mentions and notifications", "Client access with limited view"]],
      ["Resources and workload", "Avoid overloading the same few people.", ["Team availability view", "Workload by person and week", "Role-based assignment", "Leave-aware planning"]],
      ["Time and budget", "Know what each project is costing.", ["Timesheets", "Budget vs spent", "Billable and non-billable hours", "Cost alerts"]],
      ["Risks and issues", "Catch problems while they are small.", ["Issue and risk register", "Priority and owner for each", "Change requests", "Resolution history"]],
      ["Progress reports", "Reports that need no extra preparation.", ["Project health summary", "Milestone status", "Weekly report for clients", "Export to PDF"]],
    ],
    steps: [
      ["Define the project", "Scope, phases, milestones and team are set in the system."],
      ["Plan the work", "Dates, dependencies and responsibilities are assigned."],
      ["Track as you go", "Team updates progress; managers see health in real time."],
      ["Review and close", "Final reports and lessons are saved for the next project."],
    ],
    who: [
      ["IT and software teams", "Releases, sprints and client deliverables."],
      ["Construction and contracting", "Phases, site teams and budgets."],
      ["Agencies and consultants", "Many client projects at the same time."],
      ["Operations and event teams", "Time-bound work with many moving parts."],
    ],
    wins: [
      ["Early warnings", "Delays show up as soon as they start."],
      ["Clear ownership", "Every item has a person and a date."],
      ["Happier clients", "Progress is visible and reports are on time."],
    ],
    faq: [
      ["How is this different from task management?", "Project management covers the whole plan - phases, timelines, budget and risks. Task management is for day-to-day work items. They work well together."],
      ["Can clients see progress?", "Yes. You can give clients a limited login that shows only what you choose."],
      ["Can we reuse a plan?", "Yes. Save any project as a template and start the next one in minutes."],
      ["Does it track cost?", "Yes. Time and expenses are compared with the project budget."],
    ],
  },

  "task-management": {
    head: "Know what to do today, and see it done",
    what: [
      "Task management software gives every person a clear list of what is assigned to them, what is urgent and what is due. Managers assign work in seconds and see who has finished what, without calling or messaging.",
      "Mosbee Task Management is lightweight and quick to adopt. It suits daily work where people need simplicity: assign, remind, follow up and close.",
    ],
    fixes: [
      ["Tasks are given on calls and forgotten", "Every task is written, assigned and dated"],
      ["Managers keep asking 'is it done?'", "Status is visible without asking"],
      ["Urgent and routine work look the same", "Priorities and due dates put the important work first"],
      ["Repeated tasks are recreated every time", "Recurring tasks create themselves"],
    ],
    modules: [
      ["Assignments", "Give clear work to the right person in seconds.", ["Title, details, due date and owner", "Attach files and checklists", "Assign to one person or a group", "Sub-tasks"]],
      ["Reminders", "Nothing slips quietly past its date.", ["Due-date reminders", "Overdue alerts to owner and manager", "Email and app notifications", "Daily summary of what is due"]],
      ["Priorities and views", "See the work the way you prefer.", ["Priority levels", "List, board and calendar views", "Filters by person, project or status", "My tasks for today"]],
      ["Recurring work", "Automate routine jobs.", ["Daily, weekly and monthly repeats", "Task templates", "Auto-assign by rule", "Checklist for each repeat"]],
      ["Team follow-up", "Keep conversation attached to the work.", ["Comments on each task", "Status updates: to do, in progress, done", "Activity history", "Request for review or approval"]],
      ["Performance view", "Understand how work is flowing.", ["Completed vs pending", "On-time completion rate", "Workload per person", "Weekly report"]],
    ],
    steps: [
      ["Add your team", "People and groups are created with simple roles."],
      ["Create the first tasks", "Assign real work from day one - one-time or recurring."],
      ["Work from one list", "Team members update status as they go."],
      ["Review the week", "Check completed work, overdue items and workload."],
    ],
    who: [
      ["Small teams", "Replace WhatsApp groups and notebooks."],
      ["Office and admin staff", "Routine work with fixed schedules."],
      ["Field and service teams", "Jobs assigned and closed on the move."],
      ["Department heads", "Follow up without chasing."],
    ],
    wins: [
      ["Fewer follow-up calls", "Status is already on screen."],
      ["Work that gets finished", "Reminders and clear owners reduce missed items."],
      ["A fair view of workload", "See who is overloaded before it becomes a problem."],
    ],
    faq: [
      ["Is it hard to learn?", "No. Most teams are comfortable after one short session."],
      ["Can tasks repeat automatically?", "Yes. Set a schedule once and tasks appear on time."],
      ["Can I use it on my phone?", "Yes. It works in mobile browsers so people can update tasks anywhere."],
      ["Can it connect to project management?", "Yes. Tasks can sit inside a project plan or be used on their own."],
    ],
  },

  "pro-solutions": {
    head: "Software built exactly around your business",
    what: [
      "Not every business fits ready-made software. Pro Solutions is our custom development service: we study how your company actually works and build an application, portal or automation that fits it - instead of making you change your process to match a product.",
      "You get a dedicated team for planning, design, development, testing and long-term support, and you own a solution that can grow with you.",
    ],
    fixes: [
      ["Off-the-shelf software covers only part of your process", "A solution designed around your exact workflow"],
      ["Many tools that do not talk to each other", "Integrations that connect them into one flow"],
      ["Manual work that never gets automated", "Automation of repeated steps and approvals"],
      ["Worry about who will maintain it later", "Maintenance and support included in the plan"],
    ],
    modules: [
      ["Discovery and planning", "We understand the problem before writing any code.", ["Requirement workshops", "Process mapping", "Scope, timeline and cost estimate", "Clear plan you approve first"]],
      ["Custom applications", "Web and mobile software made for your use case.", ["Business web applications", "Customer and partner portals", "Mobile apps", "Dashboards and admin panels"]],
      ["Integrations", "Make your systems work together.", ["ERP, accounting and CRM connections", "Payment and messaging services", "Third-party APIs", "Data import and sync"]],
      ["Automation and AI", "Remove repeated manual work.", ["Workflow and approval automation", "Document and data processing", "AI assistants for your team or customers", "Scheduled reports"]],
      ["Quality and launch", "Tested, secure and ready for real users.", ["Functional and user testing", "Security checks", "Staged rollout", "Team training and documentation"]],
      ["Maintenance", "We stay after launch.", ["Bug fixes and updates", "Hosting and backup help", "New features as you grow", "Priority support"]],
    ],
    steps: [
      ["Understand", "We listen to your business, goals and challenges."],
      ["Design", "We plan the solution and show you how it will work."],
      ["Build", "Our team develops, tests and delivers on time."],
      ["Support", "We train your team and stay with you after launch."],
    ],
    who: [
      ["Businesses with unique processes", "No ready-made product fits."],
      ["Companies with many separate tools", "Need one connected system."],
      ["Startups", "Need a first product built well and fast."],
      ["Existing customers", "Want to extend our ERP, HRMS or other products."],
    ],
    wins: [
      ["A perfect fit", "The software follows your process, not the other way round."],
      ["Less manual work", "Repeated steps are automated."],
      ["An asset you can grow", "New features can be added as the business changes."],
    ],
    faq: [
      ["How do you price custom projects?", "After the discovery stage we share a clear scope, timeline and cost, so there are no surprises."],
      ["Can you improve software we already have?", "Yes. We can extend, redesign or integrate existing systems."],
      ["Who owns the finished solution?", "Ownership terms are agreed in writing before the project starts."],
      ["Do you offer support after delivery?", "Yes. Maintenance and support plans are available."],
    ],
  },
};