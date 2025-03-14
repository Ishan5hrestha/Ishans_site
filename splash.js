var textarea = $(".term");
var speed = 50; // Writing speed in milliseconds
var text = "sh imperium_connect.sh";

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
                             mMMm
                            %oOOo%
                          /   ||   \\
                    mMMm    //||\\\\    mMMm
                   %oOOo%  ///||\\\\\\  %oOOo%
              =w        m// //||\\\\\\\\m        w=
              %%%o%%%%%/^\\\\ //||\\\\\\\\///^\\%%%%%o%%%
                     ///|\\\\w//^\\\\\\//// || \\\\\\\\
                    ////|\\\\\\///|||\\\\\\\\//||\\\\\\\\
                   /////|\\//||||||||\\\\\\\\|||\\\\\\\\\\
                  //////||/|||/^^\\|||\\\\\\|||\\\\\\\\\\\\
                 m/////||||||/    \\||||\\\\\\\\\\\\\\\\\\\m
                %oOOOo%||||||      |||\\\\\\\\\\\\\\\\\%oOOOo%
                  \\\\\\\\///|\\        ///|||////
                    %oOo%|| \\\\    // ||%oOo%
                         \\\\\\\\    ////
                          %oOOo%

                   For the glory of the Emperor!
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
  }, Math.floor(Math.random() * 100) + 30); // Slightly faster typing
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
        $(".load").fadeOut(1500);
        window.location.href = "pages/homepage.html";
      }, 2000);
    }
  }, time * 4); // Faster scrolling speed
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
  "BIOS-e820: [mem 0x00000000c9f0b000-0x00000000c9f53fff] usable",
  "BIOS-e820: [mem 0x00000000c9f54000-0x00000000c9f5afff] type 20",
  "BIOS-e820: [mem 0x00000000c9f5b000-0x00000000c9f67fff] reserved",
  "BIOS-e820: [mem 0x00000000c9f68000-0x00000000c9f79fff] type 20",
  "BIOS-e820: [mem 0x00000000c9f7a000-0x00000000c9f7cfff] usable",
  "BIOS-e820: [mem 0x00000000c9f7d000-0x00000000c9f7efff] type 20",
  "BIOS-e820: [mem 0x00000000c9f7f000-0x00000000c9f95fff] usable",
  "BIOS-e820: [mem 0x00000000c9f96000-0x00000000c9f9bfff] type 20",
  "BIOS-e820: [mem 0x00000000c9f9c000-0x00000000c9fa3fff] usable",
  "BIOS-e820: [mem 0x00000000c9fa4000-0x00000000c9fa4fff] type 20",
  "BIOS-e820: [mem 0x00000000c9fa5000-0x00000000c9fb3fff] usable",
  "BIOS-e820: [mem 0x00000000c9fb4000-0x00000000c9fb4fff] type 20",
  "BIOS-e820: [mem 0x00000000c9fb5000-0x00000000c9fbffff] usable",
  "BIOS-e820: [mem 0x00000000c9fc0000-0x00000000c9fc4fff] type 20",
  "BIOS-e820: [mem 0x00000000c9fc5000-0x00000000c9ff0fff] usable",
  "BIOS-e820: [mem 0x00000000c9ff1000-0x00000000c9ff1fff] type 20",
  "BIOS-e820: [mem 0x00000000c9ff2000-0x00000000ca001fff] usable",
  "BIOS-e820: [mem 0x00000000ca002000-0x00000000ca028fff] type 20",
  "BIOS-e820: [mem 0x00000000ca029000-0x00000000ca03cfff] usable",
  "BIOS-e820: [mem 0x00000000ca03d000-0x00000000ca03dfff] type 20",
  "BIOS-e820: [mem 0x00000000ca03e000-0x00000000ca03efff] usable",
  "BIOS-e820: [mem 0x00000000ca03f000-0x00000000ca040fff] type 20",
  "BIOS-e820: [mem 0x00000000ca041000-0x00000000ca041fff] usable",
  "BIOS-e820: [mem 0x00000000ca042000-0x00000000ca046fff] type 20",
  "BIOS-e820: [mem 0x00000000ca047000-0x00000000ca05dfff] usable",
  "BIOS-e820: [mem 0x00000000ca05e000-0x00000000ca0bdfff] reserved",
  "BIOS-e820: [mem 0x00000000ca0be000-0x00000000ca0d7fff] type 20",
  "BIOS-e820: [mem 0x00000000ca0d8000-0x00000000ca601fff] reserved",
  "BIOS-e820: [mem 0x00000000ca602000-0x00000000ca881fff] ACPI NVS",
  "BIOS-e820: [mem 0x00000000ca882000-0x00000000ca886fff] ACPI data",
  "BIOS-e820: [mem 0x00000000ca887000-0x00000000ca887fff] usable",
  "BIOS-e820: [mem 0x00000000ca888000-0x00000000ca8cafff] ACPI NVS",
  "BIOS-e820: [mem 0x00000000ca8cb000-0x00000000cacd7fff] usable",
  "BIOS-e820: [mem 0x00000000cacd8000-0x00000000caff3fff] reserved",
  "BIOS-e820: [mem 0x00000000caff4000-0x00000000caffffff] usable",
  "BIOS-e820: [mem 0x00000000cbc00000-0x00000000cfdfffff] reserved",
  "BIOS-e820: [mem 0x00000000f8000000-0x00000000fbffffff] reserved",
  "BIOS-e820: [mem 0x00000000fec00000-0x00000000fec00fff] reserved",
  "BIOS-e820: [mem 0x00000000fed00000-0x00000000fed03fff] reserved",
  "BIOS-e820: [mem 0x00000000fed1c000-0x00000000fed1ffff] reserved",
  "BIOS-e820: [mem 0x00000000fee00000-0x00000000fee00fff] reserved",
  "BIOS-e820: [mem 0x00000000ff000000-0x00000000ffffffff] reserved",
  "BIOS-e820: [mem 0x0000000100000000-0x000000042f1fffff] usable",
  "NX (Execute Disable) protection: active",
  "efi: EFI v2.31 by American Megatrends",
  "efi:  ACPI=0xca852000  ACPI 2.0=0xca852000  SMBIOS=0xca100398 ",
  "efi: mem00: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000000000000-0x000000000005f000) (0MB)",
  "efi: mem01: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x000000000005f000-0x0000000000060000) (0MB)",
  "efi: mem02: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000000060000-0x000000000009e000) (0MB)",
  "efi: mem03: [Reserved           |   |  |  |  |   |WB|WT|WC|UC] range=[0x000000000009e000-0x00000000000a0000) (0MB)",
  "efi: mem04: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000000100000-0x0000000001000000) (15MB)",
  "efi: mem05: [Loader Data        |   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000001000000-0x00000000024e6000) (20MB)",
  "efi: mem06: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000024e6000-0x0000000020000000) (475MB)",
  "efi: mem07: [Reserved           |   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000020000000-0x0000000020200000) (2MB)",
  "efi: mem08: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000020200000-0x00000000357f2000) (341MB)",
  "efi: mem09: [Loader Data        |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000357f2000-0x0000000036bf1000) (19MB)",
  "efi: mem10: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000036bf1000-0x0000000040004000) (148MB)",
  "efi: mem11: [Reserved           |   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000040004000-0x0000000040005000) (0MB)",
  "efi: mem12: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000040005000-0x0000000095d21000) (1373MB)",
  "efi: mem13: [Loader Data        |   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000095d21000-0x00000000c7e11000) (800MB)",
  "efi: mem14: [Loader Code        |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c7e11000-0x00000000c7f34000) (1MB)",
  "efi: mem15: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c7f34000-0x00000000c7f82000) (0MB)",
  "efi: mem16: [Loader Data        |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c7f82000-0x00000000c806c000) (0MB)",
  "efi: mem17: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c806c000-0x00000000c8085000) (0MB)",
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
  "efi: mem41: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f7f000-0x00000000c9f96000) (0MB)",
  "efi: mem42: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f96000-0x00000000c9f9c000) (0MB)",
  "efi: mem43: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9f9c000-0x00000000c9fa4000) (0MB)",
  "efi: mem44: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9fa4000-0x00000000c9fa5000) (0MB)",
  "efi: mem45: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9fa5000-0x00000000c9fb4000) (0MB)",
  "efi: mem46: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9fb4000-0x00000000c9fb5000) (0MB)",
  "efi: mem47: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9fb5000-0x00000000c9fc0000) (0MB)",
  "efi: mem48: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9fc0000-0x00000000c9fc5000) (0MB)",
  "efi: mem49: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9fc5000-0x00000000c9ff1000) (0MB)",
  "efi: mem50: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9ff1000-0x00000000c9ff2000) (0MB)",
  "efi: mem51: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000c9ff2000-0x00000000ca002000) (0MB)",
  "efi: mem52: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca002000-0x00000000ca029000) (0MB)",
  "efi: mem53: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca029000-0x00000000ca03d000) (0MB)",
  "efi: mem54: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca03d000-0x00000000ca03e000) (0MB)",
  "efi: mem55: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca03e000-0x00000000ca03f000) (0MB)",
  "efi: mem56: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca03f000-0x00000000ca041000) (0MB)",
  "efi: mem57: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca041000-0x00000000ca042000) (0MB)",
  "efi: mem58: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca042000-0x00000000ca047000) (0MB)",
  "efi: mem59: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca047000-0x00000000ca05e000) (0MB)",
  "efi: mem60: [Runtime Data       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca05e000-0x00000000ca0be000) (0MB)",
  "efi: mem61: [Runtime Code       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca0be000-0x00000000ca0d8000) (0MB)",
  "efi: mem62: [Runtime Data       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca0d8000-0x00000000ca0dc000) (0MB)",
  "efi: mem63: [Runtime Data       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca0dc000-0x00000000ca102000) (0MB)",
  "efi: mem64: [Reserved           |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca102000-0x00000000ca47a000) (3MB)",
  "efi: mem65: [Reserved           |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca47a000-0x00000000ca602000) (1MB)",
  "efi: mem66: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca602000-0x00000000ca6b2000) (0MB)",
  "efi: mem67: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca6b2000-0x00000000ca86a000) (1MB)",
  "efi: mem68: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca86a000-0x00000000ca86c000) (0MB)",
  "efi: mem69: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca86c000-0x00000000ca882000) (0MB)",
  "efi: mem70: [ACPI Reclaim Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca882000-0x00000000ca887000) (0MB)",
  "efi: mem71: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca887000-0x00000000ca888000) (0MB)",
  "efi: mem72: [ACPI Memory NVS    |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca888000-0x00000000ca8cb000) (0MB)",
  "efi: mem73: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000ca8cb000-0x00000000caa17000) (1MB)",
  "efi: mem74: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000caa17000-0x00000000cacaf000) (2MB)",
  "efi: mem75: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000cacaf000-0x00000000cacbf000) (0MB)",
  "efi: mem76: [Boot Code          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000cacbf000-0x00000000cacd1000) (0MB)",
  "efi: mem77: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000cacd1000-0x00000000cacd8000) (0MB)",
  "efi: mem78: [Runtime Data       |RUN|  |  |  |   |WB|WT|WC|UC] range=[0x00000000cacd8000-0x00000000caff4000) (3MB)",
  "efi: mem79: [Boot Data          |   |  |  |  |   |WB|WT|WC|UC] range=[0x00000000caff4000-0x00000000cb000000) (0MB)",
  "efi: mem80: [Conventional Memory|   |  |  |  |   |WB|WT|WC|UC] range=[0x0000000100000000-0x000000042f200000) (13042MB)",
  "efi: mem81: [Reserved           |RUN|  |  |  |   |  |  |  |  ] range=[0x00000000cbc00000-0x00000000cfe00000) (66MB)",
  "efi: mem82: [Memory Mapped I/O  |RUN|  |  |  |   |  |  |  |UC] range=[0x00000000f8000000-0x00000000fc000000) (64MB)",
  "efi: mem83: [Memory Mapped I/O  |RUN|  |  |  |   |  |  |  |UC] range=[0x00000000fec00000-0x00000000fec01000) (0MB)",
  "efi: mem84: [Memory Mapped I/O  |RUN|  |  |  |   |  |  |  |UC] range=[0x00000000fed00000-0x00000000fed04000) (0MB)",
  "efi: mem85: [Memory Mapped I/O  |RUN|  |  |  |   |  |  |  |UC] range=[0x00000000fed1c000-0x00000000fed20000) (0MB)",
  "efi: mem86: [Memory Mapped I/O  |RUN|  |  |  |   |  |  |  |UC] range=[0x00000000fee00000-0x00000000fee01000) (0MB)",
  "efi: mem87: [Memory Mapped I/O  |RUN|  |  |  |   |  |  |  |UC] range=[0x00000000ff000000-0x0000000100000000) (16MB)",
  "SMBIOS 2.7 present.",
  "DMI: ASUSTeK COMPUTER INC. N56VZ/N56VZ, BIOS N56VZ.217 05/22/2013",
  "e820: update [mem 0x00000000-0x00000fff] usable ==> reserved",
  "e820: remove [mem 0x000a0000-0x000fffff] usable",
  "AGP: No AGP bridge found",
  "e820: last_pfn = 0x42f200 max_arch_pfn = 0x400000000",
  "MTRR default type: uncachable",
  "MTRR fixed ranges enabled:",
  "  00000-9FFFF write-back",
  "  A0000-DFFFF uncachable",
  "  E0000-FFFFF write-protect",
  "MTRR variable ranges enabled:",
  "  0 base 000000000 mask C00000000 write-back",
  "  1 base 400000000 mask FE0000000 write-back",
  "  2 base 420000000 mask FF0000000 write-back",
  "  3 base 0E0000000 mask FE0000000 uncachable",
  "  4 base 0D0000000 mask FF0000000 uncachable",
  "  5 base 0CC000000 mask FFC000000 uncachable",
  "  6 base 0CBC00000 mask FFFC00000 uncachable",
  "  7 base 42F800000 mask FFF800000 uncachable",
  "  8 base 42F400000 mask FFFC00000 uncachable",
  "  9 base 42F200000 mask FFFE00000 uncachable",
  "PAT configuration [0-7]: WB  WC  UC- UC  WB  WC  UC- UC  ",
  "original variable MTRRs",
  "reg 0, base: 0GB, range: 16GB, type WB",
  "reg 1, base: 16GB, range: 512MB, type WB",
  "reg 2, base: 16896MB, range: 256MB, type WB",
  "reg 3, base: 3584MB, range: 512MB, type UC",
  "reg 4, base: 3328MB, range: 256MB, type UC",
  "reg 5, base: 3264MB, range: 64MB, type UC",
  "reg 6, base: 3260MB, range: 4MB, type UC",
  "reg 7, base: 17144MB, range: 8MB, type UC",
  "reg 8, base: 17140MB, range: 4MB, type UC",
  "reg 9, base: 17138MB, range: 2MB, type UC",
  "total RAM covered: 16302M",
  " gran_size: 64K 	chunk_size: 64K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 64K 	chunk_size: 128K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 64K 	chunk_size: 256K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 64K 	chunk_size: 512K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 64K 	chunk_size: 1M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 64K 	chunk_size: 2M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 64K 	chunk_size: 4M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 64K 	chunk_size: 8M 	num_reg: 10  	lose cover RAM: 50M",
  "*BAD*gran_size: 64K 	chunk_size: 16M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 64K 	chunk_size: 32M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 64K 	chunk_size: 64M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 64K 	chunk_size: 128M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 64K 	chunk_size: 256M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 64K 	chunk_size: 512M 	num_reg: 10  	lose cover RAM: -268M",
  "*BAD*gran_size: 64K 	chunk_size: 1G 	num_reg: 10  	lose cover RAM: -264M",
  "*BAD*gran_size: 64K 	chunk_size: 2G 	num_reg: 10  	lose cover RAM: -1288M",
  " gran_size: 128K 	chunk_size: 128K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 128K 	chunk_size: 256K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 128K 	chunk_size: 512K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 128K 	chunk_size: 1M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 128K 	chunk_size: 2M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 128K 	chunk_size: 4M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 128K 	chunk_size: 8M 	num_reg: 10  	lose cover RAM: 50M",
  "*BAD*gran_size: 128K 	chunk_size: 16M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 128K 	chunk_size: 32M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 128K 	chunk_size: 64M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 128K 	chunk_size: 128M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 128K 	chunk_size: 256M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 128K 	chunk_size: 512M 	num_reg: 10  	lose cover RAM: -268M",
  "*BAD*gran_size: 128K 	chunk_size: 1G 	num_reg: 10  	lose cover RAM: -264M",
  "*BAD*gran_size: 128K 	chunk_size: 2G 	num_reg: 10  	lose cover RAM: -1288M",
  " gran_size: 256K 	chunk_size: 256K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 256K 	chunk_size: 512K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 256K 	chunk_size: 1M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 256K 	chunk_size: 2M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 256K 	chunk_size: 4M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 256K 	chunk_size: 8M 	num_reg: 10  	lose cover RAM: 50M",
  "*BAD*gran_size: 256K 	chunk_size: 16M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 256K 	chunk_size: 32M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 256K 	chunk_size: 64M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 256K 	chunk_size: 128M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 256K 	chunk_size: 256M 	num_reg: 10  	lose cover RAM: -12M",
  "*BAD*gran_size: 256K 	chunk_size: 512M 	num_reg: 10  	lose cover RAM: -268M",
  "*BAD*gran_size: 256K 	chunk_size: 1G 	num_reg: 10  	lose cover RAM: -264M",
  "*BAD*gran_size: 256K 	chunk_size: 2G 	num_reg: 10  	lose cover RAM: -1288M",
  " gran_size: 512K 	chunk_size: 512K 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 512K 	chunk_size: 1M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 512K 	chunk_size: 2M 	num_reg: 10  	lose cover RAM: 242M",
  " gran_size: 512K 	chunk_size: 4M 	num_reg: 10  	lose cover RAM: 242M",
  "mtrr_cleanup: can not find optimal value",
  "please specify mtrr_gran_size/mtrr_chunk_size",
  "e820: update [mem 0xcbc00000-0xffffffff] usable ==> reserved",
  "e820: last_pfn = 0xcb000 max_arch_pfn = 0x400000000",
  "Scanning 1 areas for low memory corruption",
  "Base memory trampoline at [ffff880000098000] 98000 size 24576",
  "init_memory_mapping: [mem 0x00000000-0x000fffff]",
  " [mem 0x00000000-0x000fffff] page 4k",
  "BRK [0x01fe5000, 0x01fe5fff] PGTABLE",
  "BRK [0x01fe6000, 0x01fe6fff] PGTABLE",
  "BRK [0x01fe7000, 0x01fe7fff] PGTABLE",
  "init_memory_mapping: [mem 0x42f000000-0x42f1fffff]",
  " [mem 0x42f000000-0x42f1fffff] page 2M",
  "BRK [0x01fe8000, 0x01fe8fff] PGTABLE",
  "init_memory_mapping: [mem 0x420000000-0x42effffff]",
  " [mem 0x420000000-0x42effffff] page 2M",
  "init_memory_mapping: [mem 0x400000000-0x41fffffff]",
  " [mem 0x400000000-0x41fffffff] page 2M",
  "init_memory_mapping: [mem 0x00100000-0x1fffffff]",
  " [mem 0x00100000-0x001fffff] page 4k",
  " [mem 0x00200000-0x1fffffff] page 2M",
  "init_memory_mapping: [mem 0x20200000-0x40003fff]",
  "init_memory_mapping: [mem 0xcaff4000-0xcaffffff]",
  " [mem 0xcaff4000-0xcaffffff] page 4k",
  "init_memory_mapping: [mem 0x100000000-0x3ffffffff]",
  " [mem 0x100000000-0x3ffffffff] page 2M",
  "RAMDISK: [mem 0x357f2000-0x36bf0fff]",
  "ACPI: Early table checksum verification disabled",
  "ACPI: RSDP 0x00000000CA852000 000024 (v02 _ASUS_)",
  "ACPI: XSDT 0x00000000CA852080 000084 (v01 _ASUS_ Notebook 01072009 AMI  00010013)",
  "ACPI: FACP 0x00000000CA865DF0 00010C (v05 _ASUS_ Notebook 01072009 AMI  00010013)",
  "ACPI: DSDT 0x00000000CA852190 013C5A (v02 _ASUS_ Notebook 00000013 INTL 20091112)",
  "ACPI: FACS 0x00000000CA87F080 000040",
  "ACPI: APIC 0x00000000CA865F00 000092 (v03 _ASUS_ Notebook 01072009 AMI  00010013)",
  "ACPI: FPDT 0x00000000CA865F98 000044 (v01 _ASUS_ Notebook 01072009 AMI  00010013)",
  "ACPI: ECDT 0x00000000CA865FE0 0000C1 (v01 _ASUS_ Notebook 01072009 AMI. 00000005)",
  "ACPI: MCFG 0x00000000CA8660A8 00003C (v01 _ASUS_ Notebook 01072009 MSFT 00000097)",
  "ACPI: HPET 0x00000000CA8660E8 000038 (v01 _ASUS_ Notebook 01072009 AMI. 00000005)",
  "ACPI: SSDT 0x00000000CA866120 000632 (v01 AhciR1 AhciTab1 00001000 INTL 20091112)",
  "ACPI: SSDT 0x00000000CA866758 00049E (v01 AhciR2 AhciTab2 00001000 INTL 20091112)",
  "ACPI: SSDT 0x00000000CA866BF8 00094C (v01 PmRef  Cpu0Ist  00003000 INTL 20051117)",
  "ACPI: SSDT 0x00000000CA867548 000B18 (v01 PmRef  CpuPm    00003000 INTL 20051117)",
  "ACPI: BGRT 0x00000000CA868060 000038 (v00 _ASUS_ Notebook 01072009 ASUS 00010013)",
  "ACPI: MSDM 0x00000000CA601E18 000055 (v03 _ASUS_ Notebook 00000000 ASUS 00000001)",
  "ACPI: Local APIC address 0xfee00000",
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
