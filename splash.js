var textarea = $(".term");
var speed = 50; // Writing speed in milliseconds
var text = "sh connect_ishan.sh";

// Collection of Warhammer 40k Dawn of War quotes
var warhammerQuotes = [
  "Even in death, I still serve.",
  "Hope is the first step on the road to disappointment.",
  "Walk softly and carry a big gun.",
  "Knowledge is power, guard it well.",
  "Only in death does duty end.",
  "Burn the heretic. Kill the mutant. Purge the unclean.",
  "Success is measured in blood; yours or your enemy's.",
  "Fear denies faith.",
  "There is no such thing as innocence, only degrees of guilt.",
  "Faith is my shield.",
  "For the Emperor!",
];

// ASCII art for Warhammer 40k - Imperial Aquila
var asciiArt = `
                                 Imperium of Man
                               ___====-_  _-====___
                         _--^^^#####//      \\#####^^^--_
                      _-^##########// (    ) \\##########^-_
                     -############//  |\^^/|  \\############-
                   _/############//   (@::@)   \\############\_
                  /#############((     \\//     ))#############\-
                 -###############\\    (oo)    //###############-
                -#################\\  / VV \  //#################-
               -###################\\/      \//###################-
              _#/|##########/\######(   /\   )######/\##########|\#_
              |/ |#/\#/\#/\/  \#/\##\  /  \  /##/\#/  \/\#/\#/\#| \|
              '  |/  V  V      V  \#\| |  | |/#/  V      V  V  \|  '
                 '   '  '         / | |  | | \         '  '   '
                                  (  | |  | |  )
                                 __\ | |  | | /__
                                (vvv(VVV)(VVV)vvv)
`;

var marineHelmetArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⢀⠨⠭⢭⣭⢭⡥⠭⠕⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⠄⠂⠉⢷⣠⣼⡛⣘⣷⣀⡶⠉⠐⠠⡀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⠬⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧⡀⠀⠀⠀
⠀⠀⢀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡀⠀⠀
⠀⠀⡌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀
⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀
⡔⠊⡀⠀⢰⡤⠄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠠⠤⡆⠀⢈⠐⢢
⡇⠀⢇⣀⠀⠈⢆⠀⠈⠁⠒⡠⠤⠤⢄⠒⠈⠁⠀⡠⠁⢃⣄⡸⠀⢸
⠃⠀⡆⠀⠀⠀⠄⠈⠐⠒⠈⠀⡤⢤⠀⠁⠒⠂⢁⠠⠂⠀⠀⢱⠀⠸
⠀⢀⣗⣲⢷⠀⠀⠀⠉⢀⡂⣤⡒⣒⣄⠠⡄⠉⠀⠀⠀⡶⣖⡺⡀⠈
⡀⡁⡏⣇⢿⠀⠈⠀⠰⢁⢷⡇⡷⣿⢸⡷⡈⠆⠀⠁⠀⡿⣿⢿⠈⢀
⠘⠧⡧⠴⣸⠀⠂⠀⡎⣇⡞⡏⣇⣼⢹⢲⢱⢓⠀⠀⠀⣇⠦⢼⠰⠂
⠀⠈⢏⡔⠈⠀⢏⢿⠁⢿⡇⣇⡿⣿⣼⢸⣿⠈⡝⠙⠐⠁⢪⡚⠁⠀
⠀⠀⠀⠑⠚⠀⠒⠙⠦⠜⠷⣏⣃⣛⣹⠾⠣⠴⠋⠒⠀⠐⠊⠀⠀⠀
`;

var skullArt = `
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⣽⣏⠛⠿⣿⣿⡿⠙⠷⣦⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡟⠛⢿⣿⠃⠙⠻⢦⣌⡙⠷⣦⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣦⡿⢷⣄⡀⠀⠀⠉⠻⢶⠈⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣍⠛⠷⣤⣀⠀⠀⠀⠀⠀⠈⢙⡿⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠙⠻⢶⣌⡉⠀⠀⠀⠀⠀⣰⡟⢡⡾⠛⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠉⠻⢶⣄⣀⣠⣼⡏⣰⡟⠁⠀⠀⠻⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠉⣷⣦⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣄⣹⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠟⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠋⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡿⠁⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡿⠁⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣤⣤⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
`;

var i = 0;

/**
 * Character cadence: discrete step sizes + occasional long gaps (UART / refresh feel).
 * @returns {number}
 */
function crtTypingDelayMs() {
  var r = Math.random();
  if (r < 0.075) {
    return 110 + Math.floor(Math.random() * 160);
  }
  if (r < 0.14) {
    return 6 + Math.floor(Math.random() * 12);
  }
  var steps = [12, 18, 24, 30, 36, 44, 52, 60];
  return steps[Math.floor(Math.random() * steps.length)];
}

/**
 * Stepped line delay for boot log (not a smooth scroll).
 * @param {number} t base multiplier 1–3
 * @returns {number}
 */
function crtLineDelayMs(t) {
  return 16 + t * 14 + Math.floor(Math.random() * 6) * 9;
}

runner();

// Function to ensure scrolling to the latest content
function scrollToBottom() {
  // Target the .term element specifically for scrolling
  const termElement = document.querySelector(".term");
  if (termElement) {
    termElement.scrollTop = termElement.scrollHeight;
  }
  // Also scroll the window as a fallback
  window.scrollTo(0, document.body.scrollHeight);
}

function runner() {
  textarea.append(text.charAt(i));
  i++;
  setTimeout(function () {
    if (i < text.length) runner();
    else {
      textarea.append("<br>");
      scrollToBottom(); // Add scroll after command is completed
      i = 0;
      setTimeout(function () {
        // Display ASCII art first
        displayAsciiArt();
      }, 1000);
    }
  }, crtTypingDelayMs());
}

function displayAsciiArt() {
  // Display the Imperial Aquila first
  textarea.append(asciiArt + "<br><br>");
  scrollToBottom();

  // Wait briefly, then show next art
  setTimeout(function () {
    // Display the Marine Helmet art with a title
    textarea.append(
      "<span class='imperial'>Adeptus Astartes Battle Helm detected...</span><br>"
    );
    textarea.append(marineHelmetArt + "<br>");
    scrollToBottom();

    // Wait briefly, then show next art
    setTimeout(function () {
      // Display the Skull art with a title
      textarea.append(
        "<span class='imperial'>Servitor-Skull uplink established...</span><br>"
      );
      textarea.append(skullArt + "<br><br>");
      scrollToBottom();

      // Wait briefly then start the output sequence
      setTimeout(function () {
        feedbacker();
      }, 1000);
    }, 2000);
  }, 3000);
}

var count = 0;
var time = 1;
function feedbacker() {
  // Add Warhammer 40k themed boot messages
  var warhammerBootMessages = [
    "Establishing connection to the Astronomican...",
    "Adeptus Mechanicus ritual of awakening complete",
    "Machine spirit placated and responsive",
    "Sanctified cogitator arrays initialized",
    "Throne of Terra authentication protocols verified",
    "Holy Imperial encryption active",
    "Warp stabilization matrices online",
    "The Emperor protects: System security measures engaged",
    "Servo-skull link established",
    "Inquisitorial clearance verified",
  ];

  // Mix in Warhammer themed messages with original output
  if (i < 10) {
    textarea.append(
      "[<span class='timestamp'>" +
        (count / 1000).toFixed(3) +
        "</span>] <span class='imperial'>" +
        warhammerBootMessages[i] +
        "</span><br>"
    );
  } else if (i < output.length) {
    textarea.append(
      "[<span class='timestamp'>" +
        (count / 1000).toFixed(3) +
        "</span>] " +
        output[i] +
        "<br>"
    );
  }

  scrollToBottom(); // Add scroll after each new line is added

  i++;
  time = Math.floor(Math.random() * 3) + 1;
  count += time;
  setTimeout(function () {
    if (i < output.length - 2) feedbacker();
    else {
      // Display a random Warhammer 40k quote
      var randomQuote =
        warhammerQuotes[Math.floor(Math.random() * warhammerQuotes.length)];
      textarea.append(
        "<br><span class='quote'>\"" + randomQuote + '"</span><br>'
      );
      textarea.append(
        "<br><span class='system-msg'>Connection to Imperial Network established. Initialising interface...</span><br>"
      );

      scrollToBottom(); // Add scroll after final messages

      setTimeout(function () {
        var $load = $(".load");
        $load.css({
          transition: "opacity 0.55s steps(6, end)",
          opacity: "0",
        });
        window.setTimeout(function () {
          window.location.href = "pages/homepage.html";
        }, 600);
      }, 2000);
    }
  }, crtLineDelayMs(time));
}

var output = [
  "CPU0 microcode updated early to revision 0x1b, date = 2014-05-29",
  "Initializing cgroup subsys cpuset",
  "Initializing cgroup subsys cpu",
  "Initializing cgroup subsys cpuacct",
  "Command line: BOOT_IMAGE=/vmlinuz-3.19.0-21-generic.efi.signed root=UUID=14ac372e-6980-4fe8-b247-fae92d54b0c5 ro quiet splash acpi_enforce_resources=lax intel_pstate=enable rcutree.rcu_idle_gp_delay=1 nouveau.runpm=0 vt.handoff=7",
  "KERNEL supported cpus:",
  "  Intel GenuineIntel",
  "  AMD AuthenticAMD",
  "  Centaur CentaurHauls",
  "e820: BIOS-provided physical RAM map:",
  "BIOS-e820: [mem 0x0000000000000000-0x000000000009dfff] usable",
  "BIOS-e820: [mem 0x000000000009e000-0x000000000009ffff] reserved",
  "BIOS-e820: [mem 0x0000000000100000-0x000000001fffffff] usable",
  "BIOS-e820: [mem 0x0000000020000000-0x00000000201fffff] reserved",
  "BIOS-e820: [mem 0x0000000020200000-0x0000000040003fff] usable",
  "BIOS-e820: [mem 0x0000000040004000-0x0000000040004fff] reserved",
  "BIOS-e820: [mem 0x0000000040005000-0x00000000c9746fff] usable",
  "BIOS-e820: [mem 0x00000000c9747000-0x00000000c9d47fff] ACPI NVS",
  "BIOS-e820: [mem 0x00000000c9d48000-0x00000000c9d4afff] type 20",
  "BIOS-e820: [mem 0x00000000c9d4b000-0x00000000c9d60fff] usable",
  "BIOS-e820: [mem 0x00000000c9d61000-0x00000000c9d66fff] type 20",
  "BIOS-e820: [mem 0x00000000c9d67000-0x00000000c9d68fff] usable",
  "BIOS-e820: [mem 0x00000000c9d69000-0x00000000c9d72fff] type 20",
  "BIOS-e820: [mem 0x00000000c9d73000-0x00000000c9f06fff] usable",
  "BIOS-e820: [mem 0x00000000c9f07000-0x00000000c9f0afff] type 20",
  "BIOS-e820: [mem 0x00000000ff000000-0x00000000ffffffff] reserved",
  "BIOS-e820: [mem 0x0000000100000000-0x000000042f1fffff] usable",
  "NX (Execute Disable) protection: active",
  "efi: EFI v2.31 by American Megatrends",
  "efi:  ACPI=0xca852000  ACPI 2.0=0xca852000  SMBIOS=0xca100398 ",
  "efi: mem00: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000000000000-0x000000000005f000) (0MB)",
  "efi: mem01: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x000000000005f000-0x0000000000060000) (0MB)",
  "efi: mem02: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000000060000-0x000000000009e000) (0MB)",
  "efi: mem18: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c8085000-0x00000000c808e000) (0MB)",
  "efi: mem19: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c808e000-0x00000000c8244000) (1MB)",
  "efi: mem20: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c8244000-0x00000000c824b000) (0MB)",
  "efi: mem21: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c824b000-0x00000000c8312000) (0MB)",
  "efi: mem22: [Loader Data        |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c8312000-0x00000000c8314000) (0MB)",
  "efi: mem23: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c8314000-0x00000000c909e000) (13MB)",
  "efi: mem24: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c909e000-0x00000000c972e000) (6MB)",
  "efi: mem25: [Loader Data        |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c972e000-0x00000000c973a000) (0MB)",
  "efi: mem26: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c973a000-0x00000000c9747000) (0MB)",
  "efi: mem27: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9747000-0x00000000c9d48000) (6MB)",
  "efi: mem28: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9d48000-0x00000000c9d4b000) (0MB)",
  "efi: mem29: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9d4b000-0x00000000c9d61000) (0MB)",
  "efi: mem30: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9d61000-0x00000000c9d67000) (0MB)",
  "efi: mem31: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9d67000-0x00000000c9d69000) (0MB)",
  "efi: mem32: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9d69000-0x00000000c9d73000) (0MB)",
  "efi: mem33: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9d73000-0x00000000c9f07000) (1MB)",
  "efi: mem34: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f07000-0x00000000c9f0b000) (0MB)",
  "efi: mem35: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f0b000-0x00000000c9f54000) (0MB)",
  "efi: mem36: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f54000-0x00000000c9f5b000) (0MB)",
  "efi: mem37: [Runtime Data       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f5b000-0x00000000c9f68000) (0MB)",
  "efi: mem38: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f68000-0x00000000c9f7a000) (0MB)",
  "efi: mem39: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f7a000-0x00000000c9f7d000) (0MB)",
  "efi: mem40: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f7d000-0x00000000c9f7f000) (0MB)",
  "efi: mem68: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca86a000-0x00000000ca86c000) (0MB)",
  "efi: mem69: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca86c000-0x00000000ca882000) (0MB)",
  "efi: mem70: [ACPI Reclaim Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca882000-0x00000000ca887000) (0MB)",
  "No NUMA configuration found",
  "Faking a node at [mem 0x0000000000000000-0x000000042f1fffff]",
  "NODE_DATA(0) allocated [mem 0x42f1e6000-0x42f1eafff]",
  " [ffffea0000000000-ffffea0010bfffff] PMD -> [ffff88041e800000-ffff88042e7fffff] on node 0",
  "Zone ranges:",
  "  DMA      [mem 0x00001000-0x00ffffff]",
  "  DMA32    [mem 0x01000000-0xffffffff]",
  "  Normal   [mem 0x100000000-0x42f1fffff]",
  "Movable zone start for each node",
  "Early memory node ranges",
  "  node   0: [mem 0x00001000-0x0009dfff]",
  "  node   0: [mem 0x00100000-0x1fffffff]",
  "  node   0: [mem 0x20200000-0x40003fff]",
  "  node   0: [mem 0x40005000-0xc9746fff]",

  "Initialising...",
  "",
];
