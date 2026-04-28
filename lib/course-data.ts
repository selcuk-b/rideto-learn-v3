// ─── Types ────────────────────────────────────────────────────────────────────
// Shape matches future database schema (V2). Do not rename fields.

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  image?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  order: number;
  content: string;
  estimatedReadTime: string;
  youtubeVideoId?: string;
  keyTakeaway: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz?: Quiz;
  estimatedTime: string;
  icon?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  trainingType: string;
  modules: Module[];
  quiz?: Quiz;
  estimatedTime: string;
  status: "draft" | "published" | "archived";
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const COURSE_SLUG = "pre-cbt";

// ─── Course Data ──────────────────────────────────────────────────────────────

export const course: Course = {
  id: "course-pre-cbt",
  title: "Pre-CBT Training",
  description:
    "Everything you need to know before your motorcycle training day — from Highway Code essentials to what to pack.",
  slug: "pre-cbt",
  trainingType: "cbt",
  estimatedTime: "~75 min",
  status: "published",
  quiz: {
    id: "quiz-pre-cbt-comprehensive",
    title: "Pre-CBT Quiz",
    description: "Test your knowledge across all Pre-CBT topics.",
    passingScore: 70,
    questions: [
      // ── Section 1: Pre-Training Basics ──────────────────────────────────
      {
        id: "q-1",
        questionText: "What type of licence must you bring for your CBT training?",
        options: [
          "Full UK driving licence",
          "Valid UK provisional licence",
          "EU licence with verified D9 form",
          "Any of the above",
        ],
        correctAnswerIndex: 3,
        explanation: "Any of these licences are accepted but only the physical card. Photos or photocopies are not accepted!",
      },
      {
        id: "q-2",
        questionText: "What type of footwear must you wear for CBT training?",
        options: ["Trainers", "Boots", "Sturdy shoes", "Flip Flops"],
        correctAnswerIndex: 1,
        explanation: "Only sturdy boots which protect your feet and ankles are accepted for motorcycle training.",
      },
      {
        id: "q-3",
        questionText: "What sort of clothing must you wear on your legs?",
        options: ["A skirt", "Tracksuit bottoms", "Jeans", "Shorts"],
        correctAnswerIndex: 2,
        explanation: "Only strong jeans (with no rips) or CE approved motorcycle trousers which protect you are accepted for motorcycle training.",
      },
      {
        id: "q-4",
        questionText: "What should you do if you are running late for your CBT training?",
        options: [
          "Inform the instructor",
          "Rush to the location",
          "You cannot be late; you will not be allowed to train",
          "Call to reschedule",
        ],
        correctAnswerIndex: 2,
        explanation: "You cannot be late for motorcycle training. Even two minutes late to the start of the course could mean you are not allowed to start and will have to book and pay for another day.",
      },
      {
        id: "q-5",
        questionText: "Which code should you revise before attending CBT training?",
        options: ["Road Code", "Highway Code", "Motorcycle Code", "Safety Code"],
        correctAnswerIndex: 1,
        explanation: "You must have read and understand the Highway Code in order to be prepared for your CBT. Understanding the Highway Code is a legal requirement you agreed to when applying for your licence from the DVSA.",
      },
      {
        id: "q-6",
        questionText: "What must you demonstrate you are able to do during the CBT?",
        options: [
          "Repairing a motorcycle",
          "Reading a number plate from 20 metres away",
          "Riding without hands",
          "Performing stunts",
        ],
        correctAnswerIndex: 1,
        explanation: "You must be able to read a number plate from 20 metres away before you are allowed to begin the CBT. If you need to wear glasses or contact lenses please ensure you bring them.",
      },
      // ── Section 2: Road Signs ────────────────────────────────────────────
      {
        id: "q-7",
        questionText: "What are red circular signs used for?",
        image: "/images/quiz/q07-no-motor-vehicles.png",
        options: ["Informational sign", "Warning sign", "Mandatory order", "Directional sign"],
        correctAnswerIndex: 2,
        explanation: "Red circular signs are used to give mandatory information you must follow.",
      },
      {
        id: "q-8",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q07-no-motor-vehicles.png",
        options: [
          "Only cars and motorbikes allowed",
          "Warning motorcycle jumping over a car ahead",
          "No motor vehicles are permitted",
          "No cars only motorbikes allowed",
        ],
        correctAnswerIndex: 2,
        explanation: "It instructs road users that no motor vehicles (including motorcycles) are permitted beyond this point.",
      },
      {
        id: "q-9",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q09-ahead-only.png",
        options: ["Stop and allow traffic to pass", "Ride in a straight line", "Look up", "Ahead only"],
        correctAnswerIndex: 3,
        explanation: "The sign means you must ride ahead only.",
      },
      {
        id: "q-10",
        questionText: "What is a red triangular sign like this used for?",
        image: "/images/quiz/q10-warning-triangle.jpg",
        options: ["Directional sign", "Warning sign", "Mandatory order", "Informational sign"],
        correctAnswerIndex: 1,
        explanation: "Red triangular signs are used as warning signs to alert road users to various hazards and changes in the road.",
      },
      {
        id: "q-11",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q11-give-way.jpg",
        options: [
          "Traffic lights ahead",
          "Stop sign",
          "You have right of way over minor road traffic",
          "You must give way to traffic on the major road",
        ],
        correctAnswerIndex: 3,
        explanation: "The GIVE WAY sign and road markings means you must give way to traffic on the major road. The sign might not be used at junctions where there is relatively little traffic but you must still give way where you see these road markings.",
      },
      {
        id: "q-12",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q12-national-speed-limit.jpg",
        options: [
          "60 mph limit",
          "50 mph limit",
          "The national speed limit for the type of road applies",
          "No speed limit",
        ],
        correctAnswerIndex: 2,
        explanation: "This sign means the national speed limit for the type of road and class of traffic applies, which typically will vary as a motorcyclist from single carriageways (60 mph) to dual carriageways (70 mph).",
      },
      {
        id: "q-13",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q13-30mph.jpg",
        options: ["Minimum speed limit", "Maximum speed limit", "Recommended speed limit", "No speed limit"],
        correctAnswerIndex: 1,
        explanation: "This sign tells you the maximum speed, in miles per hour, at which traffic may travel, if it is safe to do so.",
      },
      {
        id: "q-14",
        questionText: "What does this sign indicate?",
        image: "/images/quiz/q14-humps.jpg",
        options: ["Smooth road ahead", "Speed bump ahead", "Pedestrian crossing", "End of road works"],
        correctAnswerIndex: 1,
        explanation: "This sign indicates road humps ahead. These signs warn road users that they must slow their speed due to a speed hump ahead. These are positioned in places where traffic needs to slow down for safety purposes.",
      },
      {
        id: "q-15",
        questionText: "What does this sign indicate?",
        image: "/images/quiz/q15-no-right-turn.jpg",
        options: ["Warning corner ahead", "No U-turns", "End of speed limit", "Banned right turn"],
        correctAnswerIndex: 3,
        explanation: "This sign means banned right turn. In this case you must not make a right turn.",
      },
      {
        id: "q-16",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q16-no-entry.jpg",
        options: ["No parking", "No entry", "No stopping", "No overtaking"],
        correctAnswerIndex: 1,
        explanation: "This sign indicates no entry. No vehicle of any type is allowed beyond the point of this road sign.",
      },
      {
        id: "q-17",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q17-keep-left.jpg",
        options: ["Stop", "Watch out for hazard in road", "Keep right", "Keep left"],
        correctAnswerIndex: 3,
        explanation: "This sign means keep left. This is commonly seen as you approach traffic islands. You must keep to the left-hand side of the sign as you pass it.",
      },
      {
        id: "q-18",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q18-slippery-road.jpg",
        options: ["Smooth road", "Road narrows", "Slippery road", "Road works ahead"],
        correctAnswerIndex: 2,
        explanation: "This sign means slippery roads ahead. This sign warns road users to be cautious and take extra care as there is either water, ice or snow on the road ahead.",
      },
      {
        id: "q-19",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q19-no-u-turn.jpg",
        options: ["Roundabout ahead", "U-turn permitted", "End of tunnel", "No U-turn"],
        correctAnswerIndex: 3,
        explanation: "This sign indicates no U-turns allowed. These signs are posted at junctions and tell road users that it is illegal to make U-turns in that area.",
      },
      // ── Section 3: Roundabouts ───────────────────────────────────────────
      {
        id: "q-20",
        questionText: "What does this sign mean?",
        image: "/images/quiz/q20-roundabout-ahead.jpg",
        options: ["No entry", "Hole in road", "Roundabout ahead", "Junction ahead"],
        correctAnswerIndex: 2,
        explanation: "This sign indicates a roundabout is ahead. Warns to proceed with caution as there is a roundabout approaching.",
      },
      {
        id: "q-21",
        questionText: "What should you do when turning left at a roundabout?",
        options: [
          "Signal right, move to the right lane",
          "Check mirrors, signal left, check left shoulder, move left lane, give way, proceed when safe",
          "No signal, keep right",
          "Signal left, move to the right lane",
        ],
        correctAnswerIndex: 1,
        explanation: "Check mirrors, signal left, check left shoulder, move left lane, give way, proceed when safe.",
      },
      {
        id: "q-22",
        questionText: "What is the correct procedure when travelling straight ahead at a roundabout?",
        image: "/images/quiz/q22-roundabout-straight.png",
        options: [
          "Signal left on approach, keep right",
          "No signal on approach, keep left, signal left as you pass the road before yours, lifesaver check and proceed when safe",
          "Signal right on approach, keep left",
          "Signal left, move to the left lane",
        ],
        correctAnswerIndex: 1,
        explanation: "No signal on approach, keep left, signal left as you pass the road before yours, lifesaver check and proceed when safe.",
      },
      {
        id: "q-23",
        questionText: "Who has the right of way at a roundabout?",
        image: "/images/quiz/q23-roundabout-right-of-way.png",
        options: ["Vehicles from the left", "Pedestrians", "Oncoming traffic from the right", "Bicycles only"],
        correctAnswerIndex: 2,
        explanation: "Oncoming traffic from the right has right of way at a roundabout. At a roundabout, you MUST give way to oncoming traffic, which will always be approaching from the right.",
      },
      {
        id: "q-24",
        questionText: "When should you signal right at a roundabout?",
        image: "/images/quiz/q24-roundabout-right-turn.png",
        options: [
          "When turning left",
          "When travelling straight ahead",
          "When turning right or going full circle",
          "Never signal right",
        ],
        correctAnswerIndex: 2,
        explanation: "You signal right at a roundabout when turning right or going full circle.",
      },
      {
        id: "q-25",
        questionText: "What is the first step when approaching a roundabout to turn right?",
        options: ["Move to the right lane", "Signal right", "Check mirrors", "Move to the left lane"],
        correctAnswerIndex: 2,
        explanation: "The first step when approaching a roundabout is to check your mirrors.",
      },
      // ── Section 4: Traffic Lights & Moving Off ───────────────────────────
      {
        id: "q-26",
        questionText: "What does a red traffic light mean?",
        options: ["Slow down", "Yield", "Stop", "Proceed with caution"],
        correctAnswerIndex: 2,
        explanation: "A red traffic light means you must stop and wait behind the stop line on the road.",
      },
      {
        id: "q-27",
        questionText: "What should you do when you see a yellow traffic light?",
        options: [
          "Get ready to go",
          "Speed up to cross the junction",
          "Stop if it is safe to do so",
          "Proceed without caution",
        ],
        correctAnswerIndex: 2,
        explanation: "A yellow traffic light means stop before the stop line. Drive ahead only if the yellow light appears after you have crossed the stop line or are so close to it that pulling up might cause an accident.",
      },
      {
        id: "q-28",
        questionText: "What does the red and yellow traffic light combination indicate?",
        options: ["Prepare to stop", "Proceed with caution", "Stop and wait for the green light", "Slow down"],
        correctAnswerIndex: 2,
        explanation: "Red and yellow traffic lights also mean stop. Wait behind the stop line and do not pass through or start until the green light shows.",
      },
      {
        id: "q-29",
        questionText: "What steps must you take before moving off?",
        options: [
          "Signal, then move off immediately",
          "Look around, check mirrors, signal, and take a final look",
          "Check mirrors, then move off",
          "Honk the horn to alert others",
        ],
        correctAnswerIndex: 1,
        explanation: "Before moving off you should always look around, check mirrors, signal, and take a final look.",
      },
      {
        id: "q-30",
        questionText: "When your handlebars are not straight or the bike is leaning, which brake should you avoid using?",
        options: ["Rear brake", "Front brake", "Both brakes", "No brakes"],
        correctAnswerIndex: 1,
        explanation: "You should avoid using the front brake. Using the front brake in this situation can cause the bike to tip over or lose balance, especially at low speeds.",
      },
      // ── Section 5: Road Safety & Riding ─────────────────────────────────
      {
        id: "q-31",
        questionText: "What should you do when a vehicle approaching from the right signals left while you are waiting to pull out of a junction?",
        options: [
          "Pull out immediately",
          "Wait and be sure the vehicle is turning before pulling out",
          "Ignore the signal and proceed",
          "Honk to get their attention",
        ],
        correctAnswerIndex: 1,
        explanation: "You should wait and be sure the vehicle is turning before pulling out. Never assume that the vehicle will make the turn.",
      },
      {
        id: "q-32",
        questionText: "Why is overtaking a vehicle at a side junction dangerous?",
        options: [
          "Another vehicle might turn out of the side road",
          "It is not dangerous",
          "The vehicle ahead might speed up",
          "It is the best time to overtake",
        ],
        correctAnswerIndex: 0,
        explanation: "The vehicle in front may stop to allow a vehicle to turn out of the side road or turn into the side road suddenly. They are unlikely to be expecting the motorcycle to be overtaking them. Stay where you are.",
      },
      {
        id: "q-33",
        questionText: "What is a 'lifesaver' and how do you do one?",
        options: [
          "A first aid technique used during emergencies",
          "A type of defensive riding manoeuvre used only at junctions",
          "A quick glance over the shoulder to check blind spots before changing direction",
          "A method of checking mirrors repeatedly before turning",
        ],
        correctAnswerIndex: 2,
        explanation: "A lifesaver is a quick glance over the shoulder to check blind spots before changing direction. It is a crucial safety manoeuvre for motorcyclists to check their blind spot for vehicles mirrors cannot show, helping avoid collisions with overtaking vehicles.",
      },
      {
        id: "q-34",
        questionText: "What four steps should you follow before making a turn?",
        options: [
          "Signal, check mirrors, honk, manoeuvre",
          "Mirror, signal, lifesaver, manoeuvre",
          "Signal, manoeuvre, check mirrors, lifesaver",
          "Lifesaver, manoeuvre, signal, check mirrors",
        ],
        correctAnswerIndex: 1,
        explanation: "Before making a turn you should follow the process: Mirror, signal, lifesaver, manoeuvre.",
      },
      {
        id: "q-35",
        questionText: "What should you do if you intend to turn left at a junction but are stuck behind a slow-moving vehicle?",
        options: [
          "Overtake the vehicle quickly",
          "Undertake the vehicle",
          "Stay back and wait",
          "Use your horn to alert the driver",
        ],
        correctAnswerIndex: 2,
        explanation: "You should stay back and wait. Never undertake or overtake a vehicle just before you turn left. Always let the junction clear first to avoid any risk of collision.",
      },
      {
        id: "q-36",
        questionText: "Who has priority when a pedestrian is crossing a road into which you are turning?",
        options: ["You", "The pedestrian", "The vehicle behind you", "It depends on the situation"],
        correctAnswerIndex: 1,
        explanation: "The pedestrian has priority so give way and wait for them to cross.",
      },
      {
        id: "q-37",
        questionText: "Are motorcycles allowed in bus lanes?",
        options: ["No, never", "Yes, always", "Only on red routes", "It depends on the bus lane signs"],
        correctAnswerIndex: 3,
        explanation: "It depends on the bus lane signs. Bus lane rules for motorcycles vary around London and the country. A good way to confirm is to look for a motorcycle symbol on the sign at the start of the bus lane.",
      },
      {
        id: "q-38",
        questionText: "What is the recommended minimum following distance behind other vehicles in good, dry conditions?",
        options: ["1 second", "2 seconds", "3 seconds", "4 seconds"],
        correctAnswerIndex: 1,
        explanation: "In good, dry conditions you should keep a minimum gap of 2 seconds. In wet weather leave at least a 4-second gap. You can count this gap using stationary objects as the vehicle in front passes until you pass that same object.",
      },
      {
        id: "q-39",
        questionText: "Is filtering through traffic allowed for motorcycles?",
        options: [
          "Only on single carriageways",
          "Yes, always",
          "Yes, but with caution for hazards and road rules",
          "No, never",
        ],
        correctAnswerIndex: 2,
        explanation: "Filtering is allowed where safe, apart from these scenarios: passing over a solid white line, passing the wrong side of a Keep Left sign, where overtaking is illegal, or where there are zigzag lines on the approach to a pedestrian crossing.",
      },
      {
        id: "q-40",
        questionText: "Which of the following is NOT one of the top three factors in motorcycle collisions?",
        options: [
          "Excessive speed",
          "Poor road positioning",
          "Bad weather",
          "Not enough distance between the motorcycle and vehicle in front",
        ],
        correctAnswerIndex: 2,
        explanation: "The top three factors responsible for motorcycle collisions are rider errors: excessive speed, poor road positioning, and not enough distance between the motorcycle and vehicle in front. Bad weather is not one of the top three.",
      },
      {
        id: "q-41",
        questionText: "Which of the following is the most important attitude for a new rider to have before heading out on a motorcycle?",
        options: [
          "Confidence in their ability to handle any situation",
          "A sense of urgency to keep up with more experienced riders",
          "A willingness to learn and prioritise safety over speed",
          "A desire to show off their riding skills",
        ],
        correctAnswerIndex: 2,
        explanation: "A willingness to learn and prioritise safety over speed is the most important attitude a new rider can have. New riders should focus on learning and safety to build good habits and become skilled, responsible motorcyclists. A good rule of thumb is to ride within 80% of your maximum ability.",
      },
    ],
  },
  modules: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SUBSECTION A: Your CBT Day — What to Expect
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-cbt-day",
      slug: "cbt-day",
      title: "Your CBT Day — What to Expect",
      description:
        "Walk through each stage of your Compulsory Basic Training, step by step.",
      order: 1,
      estimatedTime: "~15 min",
      icon: "ClipboardList",
      lessons: [
        {
          id: "les-cd-1",
          slug: "five-elements-of-cbt",
          title: "The 5 Elements of CBT",
          order: 1,
          estimatedReadTime: "10 min",
          youtubeVideoId: "z2e37kjPW-E",
          keyTakeaway:
            "CBT is training, not a test — your instructor's job is to get you road-ready, and most people complete everything in a single day.",
          content: `Here's the thing most people get wrong about CBT: it's not a test. You can't "fail" your CBT the way you fail a driving test. It's Compulsory Basic Training — a structured day of learning that takes you from complete beginner to safe enough to ride on the road. Your instructor wants you to succeed, and they'll work with you until you're ready.

The day typically takes 6 to 8 hours and follows five elements, labelled A through E. You work through them in order, and you move to the next one when your instructor is satisfied you've got the skills down. Most people complete everything in one day, but if you need a bit more time, that's completely normal — you just come back for another session.

Here's what each element looks like.

**Element A — Introduction & Eyesight Test**

This is the gentle start. Your instructor will introduce themselves, go through the paperwork, and explain how the day works. You'll meet the other learners in your group — there can be up to four of you with one instructor for the on-site parts.

The one thing you do need to pass here is the **eyesight test**. You'll be asked to read a number plate from 20 metres away (roughly five car lengths). If you wear glasses or contact lenses, that's fine — just make sure you bring them. If you can't read the plate, you won't be able to continue that day.

That's it for Element A. No riding yet, just getting settled in.

**Element B — Getting to Know the Controls**

Now you'll get hands-on with the motorcycle or scooter. Your instructor will walk you through every control on the bike:

On the **handlebars**: throttle (right hand), front brake lever (right hand), clutch lever (left hand, if you're on a geared bike). On the **foot controls**: rear brake pedal (right foot), gear lever (left foot, geared bikes only). Plus the **switches**: indicators, horn, lights, and the kill switch.

You don't need to memorise any of this beforehand — the instructor will show you everything and give you time to practise with the engine off. The goal is to feel comfortable with where everything is before you start riding.

**Element C — Off-Road Riding**

This is where it starts to get exciting. You'll ride the bike around the training area — a car park or purpose-built compound — and practise the basics:

Starting and stopping smoothly. Riding in a straight line. Slow-speed manoeuvres like the **figure of 8** and **U-turns**. Using your indicators. An **emergency stop** — your instructor will explain the technique and you'll practise it a few times.

If you're on a geared bike, this is where you'll get used to the clutch and changing gears. If you're on an automatic, you'll focus on throttle control and braking.

Don't worry if you wobble at first — everyone does. Slow-speed riding is actually harder than going faster, because the bike has less natural balance. Your instructor knows this and will give you plenty of time to practise.

**Element D — Road Safety Briefing**

Before heading onto real roads, your instructor will sit down with you and cover the theory you need for safe riding. This includes:

Basic **Highway Code rules** relevant to your ride — junctions, roundabouts, road signs. **Hazard awareness** — what to look out for and how to ride defensively. How the on-road session will work — they'll communicate with you via a **radio earpiece**, telling you where to go and giving feedback as you ride.

This element is a conversation, not a classroom exam. Your instructor will check you understand the basics, and if anything needs brushing up, they'll explain it there and then. Having reviewed the Highway Code beforehand (which is exactly what the other modules on RideTo Learn are for) will make this part feel easy.

**Element E — On-Road Riding**

This is the big one — and honestly, for most people, the best part of the day. You'll head out onto real roads with your instructor following behind on their own bike, connected to you by radio. You'll ride for a **minimum of 2 hours**.

During Element E, the group size drops to just **2 learners per instructor**. Your instructor will guide you through the ride, telling you which way to turn and giving you real-time feedback through the earpiece. You'll encounter real junctions, roundabouts, traffic lights, and other road users.

**What your instructor is looking for:** safe riding, not perfection. They want to see that you can check your mirrors, signal properly, position yourself on the road, and deal with junctions and roundabouts without putting yourself or others at risk. Nobody expects you to ride like you've been doing it for years.

If your instructor feels you need more time on any element — including Element E — they'll let you know. Some people need a second session, and that's absolutely fine. It doesn't mean you've "failed." It just means you need a bit more practice to be safe on your own.

**What Happens When You're Done**

Once your instructor is satisfied you've completed all five elements to a safe standard, you'll receive your **DL196 certificate**. This is your CBT completion certificate, and it means you can legally ride on the road.

With your DL196, you can ride a **125cc motorcycle** (or 50cc moped if you're 16) on public roads with **L plates displayed**. Your certificate is valid for **2 years**. During that time, you can practise on the road, take your theory test, and work towards your full motorcycle licence.

Two restrictions to remember: you **cannot carry passengers**, and you **cannot ride on motorways** with just a CBT certificate.`,
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SUBSECTION B: Highway Code for CBT Riders
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-highway-code",
      slug: "highway-code",
      title: "Highway Code for CBT Riders",
      description:
        "The road rules you'll actually encounter during your CBT road ride. Not the full Highway Code — just what matters for a new rider on a 125cc.",
      order: 2,
      estimatedTime: "~20 min",
      icon: "MapPin",
      lessons: [
        {
          id: "les-hc-1",
          slug: "right-of-way-priority",
          title: "Right of Way & Priority Rules",
          order: 1,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "At any junction, know who has priority — give way lines, stop signs, and the general rule of giving way to traffic on your right at unmarked crossroads.",
          content: `Right of way rules determine who should proceed first at any junction. Getting these right is essential — hesitation or wrong decisions at junctions are among the most common problems new riders face during the on-road element of CBT.

In the UK, traffic on a major road always has priority over traffic joining from a minor road. When you see a give way sign (inverted triangle) or dashed give way lines across your lane, you must be prepared to stop and let traffic on the main road pass before you proceed. A stop sign — the only octagonal sign on UK roads — requires you to come to a complete stop, even if the road appears clear.

At unmarked crossroads where no signs or markings indicate priority, the general rule is to give way to traffic approaching from your right. However, never assume another driver knows this rule — always proceed with caution and make eye contact where possible. During your CBT road ride, your instructor will guide you through junctions, but understanding these rules in advance will make the experience far less stressful.

Priority also applies at single-track roads with passing places. If there is an oncoming vehicle and the passing place is on your left, pull into it. If it is on your right, stop opposite it and let the other vehicle pass. These situations are less common on CBT routes but knowing the rule builds your overall road awareness.`,
        },
        {
          id: "les-hc-2",
          slug: "junctions-crossroads",
          title: "Junctions, Crossroads & T-Junctions",
          order: 2,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Approach junctions slowly, use the MSM routine (Mirror, Signal, Manoeuvre), position correctly, and always check both directions before emerging.",
          content: `Junctions are where most road collisions happen, so understanding how to approach and navigate them safely is one of the most important skills for your CBT. The three main types you will encounter are T-junctions, crossroads, and staggered junctions.

At a T-junction, you are joining a road that runs across in front of you. Always give way to traffic on that road, checking carefully in both directions. When turning left, keep to the left side of your lane and signal in good time. When turning right, position yourself just left of the centre line, signal right, and wait for a safe gap in traffic from both directions before proceeding.

Crossroads require extra vigilance because traffic approaches from four directions. At a controlled crossroads with traffic lights, follow the light sequence. At uncontrolled crossroads with give way signs, treat them like a T-junction — give way to traffic on the main road. At completely unmarked crossroads, slow down, look in every direction, and give way to traffic from the right.

The MSM routine — Mirror, Signal, Manoeuvre — should become second nature at every junction. Check your mirrors well before the junction to know what is behind you, signal your intention clearly and early, then carry out the manoeuvre when safe. Your CBT instructor will coach you through this routine until it becomes automatic.`,
        },
        {
          id: "les-hc-3",
          slug: "roundabouts-lane-positioning",
          title: "Roundabouts & Lane Positioning",
          order: 3,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Give way to traffic from the right on the roundabout, choose your lane before you arrive, signal correctly on approach and exit, and look out for vehicles cutting across.",
          content: `Roundabouts require you to give way to traffic already on the roundabout, approaching from your right. The key is to approach at a controlled speed, choose the correct lane, signal appropriately, and maintain awareness of vehicles around you — especially larger vehicles that may straddle lanes.

For the first exit (turning left), stay in the left lane, signal left on approach, and maintain that signal as you exit. For exits roughly straight ahead, approach in the left lane unless signs direct otherwise. Do not signal on approach — instead, signal left after passing the exit before yours. For exits to the right (past 12 o'clock), use the right lane, signal right on approach, and change to a left signal as you pass the exit before yours.

Mini roundabouts follow the same priority rules but are smaller, often just a painted circle. You must still give way to traffic from the right. Do not ride over the central marking unless it is unavoidable due to the size of your vehicle (unlikely on a 125cc motorcycle).

Lane discipline matters on multi-lane roundabouts. Stay in your chosen lane, do not drift across lanes, and be particularly careful of vehicles in the lane next to you — they may not check their mirrors before changing lane. As a motorcyclist, you are harder to spot than a car, so ride defensively and assume other drivers have not seen you.`,
        },
        {
          id: "les-hc-4",
          slug: "pedestrian-crossings-hazards",
          title: "Pedestrian Crossings & Hazards",
          order: 4,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Know the five types of pedestrian crossing, always be ready to stop, and treat vulnerable road users — pedestrians, cyclists, horse riders — with extra caution.",
          content: `There are five main types of pedestrian crossing you need to know for your CBT, and each works slightly differently.

A zebra crossing has black and white stripes and flashing amber beacons. You must give way to anyone who has stepped onto the crossing. Slow down as you approach and be ready to stop — pedestrians have priority once they are on the stripes. Do not wave pedestrians across; just stop clearly and let them decide when it is safe.

A pelican crossing is signal-controlled with traffic lights. After the red light, a flashing amber light appears. During flashing amber, you may proceed only if the crossing is completely clear of pedestrians. A puffin crossing is similar but uses sensors to detect pedestrians, so the lights will not change to green until the crossing is clear — there is no flashing amber phase. A toucan crossing allows both pedestrians and cyclists to cross together. A pegasus crossing also accommodates horse riders and has a higher push button.

Beyond crossings, be alert for hazards involving vulnerable road users. Cyclists may wobble or swerve to avoid potholes. Children near schools are unpredictable. Horse riders may need extra passing space — slow down and pass wide and slow. During your CBT road ride, your instructor will expect you to demonstrate awareness of these hazards by adjusting your speed and position in good time.`,
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SUBSECTION C: Traffic Signs & Signals
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-traffic-signs",
      slug: "traffic-signs",
      title: "Traffic Signs & Signals",
      description:
        "Visual, quiz-heavy module. Know your signs before you're on the road.",
      order: 3,
      estimatedTime: "~20 min",
      icon: "TriangleAlert",
      lessons: [
        {
          id: "les-ts-1",
          slug: "warning-signs",
          title: "Warning Signs & Their Meanings",
          order: 1,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Warning signs are triangular with a red border. They alert you to hazards ahead — learn the most common ones you'll encounter during CBT.",
          content: `Warning signs are among the first signs you will learn to recognise, and they all share the same distinctive shape: a triangle with a red border on a white background. Their purpose is simple — to tell you about a hazard or change in road conditions ahead, giving you time to adjust your riding.

The most common warning signs you will see during a CBT road ride include: bend ahead (a curved arrow), junction on a bend, roundabout ahead, road narrows on both sides, two-way traffic (on a road that was previously one-way), and slippery road. Each one requires you to reduce speed and increase your observation.

Some warning signs are accompanied by advisory distance plates. For example, a "bend ahead" sign with a "for 1 mile" plate tells you the road will continue to wind for that distance. As a new rider, reducing speed early when you see these signs is always the safest response.

Other important warning signs include: steep hill (with a gradient percentage), traffic lights ahead (particularly useful when lights are hidden by a bend), cattle or horses on road, and school crossing patrol. When you see a warning sign, the correct response is always to slow down, look ahead carefully, and be ready to take action. Your CBT instructor will point out signs during the road ride — recognising them in advance gives you a head start.`,
        },
        {
          id: "les-ts-2",
          slug: "regulatory-signs",
          title: "Regulatory Signs",
          order: 2,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Circular signs give orders — red circles prohibit, blue circles instruct. Knowing the difference keeps you legal and safe.",
          content: `Regulatory signs give mandatory instructions. Unlike warning signs, which advise, regulatory signs must be obeyed — breaking them is a legal offence. They come in two main types: prohibitory signs (red circles) and mandatory signs (blue circles).

Red circular signs tell you what you must not do. A red circle with a number is a maximum speed limit — you must not exceed it. A red circle with a horizontal white bar means no entry. A red circle with a diagonal line through a symbol prohibits that specific action: no right turn, no U-turns, no overtaking. The national speed limit sign is a white circle with a diagonal grey stripe — it means the default speed limit applies (30mph in built-up areas with street lighting, 60mph on single carriageways, 70mph on dual carriageways and motorways).

Blue circular signs tell you what you must do. A blue circle with a white arrow means you must proceed in the direction shown. A blue circle with a number sets a minimum speed limit. A blue circle with a bicycle symbol means the route is for cyclists only. Blue rectangular signs are information signs — on motorways they give directions and route numbers.

One sign that often confuses new riders is the stop sign. It is the only octagonal sign on UK roads — a red octagon with white text reading STOP. Unlike give way, you must come to a complete standstill at the stop line, even if the road appears clear. Only proceed when you have checked carefully in all directions and it is safe.`,
        },
        {
          id: "les-ts-3",
          slug: "traffic-lights-signals",
          title: "Traffic Lights & Signals",
          order: 3,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Know the light sequence (red, red-amber, green, amber, red), what each phase means, and how filter arrows and temporary lights at roadworks work.",
          content: `The standard UK traffic light sequence is: red (stop), red and amber together (prepare to go but do not move yet), green (go if the road is clear), amber (stop unless you have already crossed the stop line or stopping would be dangerous), then back to red.

The most important thing to remember as a rider is that green does not mean "go" — it means "go if it is safe." You must still check the junction is clear before proceeding, particularly looking for pedestrians who may still be crossing and vehicles that may have jumped their red light.

Filter arrows — usually green arrows alongside or instead of the main green light — allow traffic to move in a specific direction. If a filter arrow is showing and it matches your intended direction, you may proceed even if the main light is red. If the main light is green but there is no filter arrow for your direction, do not proceed in that direction.

Temporary traffic lights at roadworks follow the same rules as permanent lights. Stop on red and proceed on green. Sometimes these are manually controlled by workers — follow their signals. At night or on quiet roads, temporary lights can take a long time to change; never be tempted to jump a red light because you think the road is clear.

Box junctions are marked with yellow criss-cross lines. You must not enter a box junction unless your exit is clear. The only exception is when turning right — you may wait in the box if you are held up by oncoming traffic or a vehicle ahead also waiting to turn right.`,
        },
        {
          id: "les-ts-4",
          slug: "road-markings-lane-guidance",
          title: "Road Markings & Lane Guidance",
          order: 4,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "White lines divide traffic and control overtaking; yellow lines restrict parking. Know what each marking means before your road ride.",
          content: `Road markings give you information and instructions without requiring you to look up at signs. White lines in the centre of the road are the most common markings you will encounter.

A broken white centre line simply divides the two directions of traffic — you may cross it to overtake if safe. A longer broken white line (with shorter gaps) is a hazard warning line, often found on approach to a junction or bend — take extra care. A solid white centre line means you must not cross it unless you are turning into a premises, avoiding a stationary obstruction, or passing a horse, cyclist or road maintenance vehicle travelling at 10mph or less.

Double white lines are the strictest. Where the line nearest to you is solid, you must not cross or straddle it. Where the line nearest to you is broken, you may cross to overtake if it is safe and you can return to your side before the broken line becomes solid. These rules are particularly important for motorcyclists who may be tempted to overtake — always check the markings first.

Yellow lines along the kerb indicate parking restrictions. A single yellow line means no parking during the hours shown on nearby signs. Double yellow lines mean no parking at any time. A red line (found in some cities) means no stopping at any time.

Road arrows guide your lane choice at junctions and roundabouts. Follow the arrows that match your intended direction. If you find yourself in the wrong lane, do not swerve across — continue in the direction your lane dictates and find a safe place to turn around.`,
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SUBSECTION D: Gear, Documents & Checklist
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-gear-docs",
      slug: "gear-docs",
      title: "Gear, Documents & Checklist",
      description:
        "Know exactly what to bring and wear on the day — no last-minute surprises. Directly reduces support tickets.",
      order: 4,
      estimatedTime: "~15 min",
      icon: "CheckSquare",
      lessons: [
        {
          id: "les-gd-1",
          slug: "cbt-day-prep",
          title: "What to Wear, Bring & Do",
          order: 1,
          estimatedReadTime: "10 min",
          keyTakeaway:
            "Bring your provisional licence photocard (non-negotiable), dress head to toe in protective gear, prepare everything the evening before, and arrive 10–15 minutes early with a full stomach.",
          content: `Your CBT day covers everything from classroom theory to riding on public roads — so arriving prepared makes a real difference. This lesson covers exactly what to wear, what to bring, and how to set yourself up the night before so nothing catches you off guard on the day.

**Helmet.** A helmet is legally required and must carry a BSI Kitemark (BS 6658:1985), ECE 22.06 mark, or equivalent approved standard. Most training schools provide helmets if you don't own one — confirm this when you book. If you buy your own, a full-face helmet gives the best all-round protection; a jet (open-face) helmet is also accepted but leaves your chin exposed.

**Gloves.** Your hands are almost always the first thing to hit the ground in a fall. Motorcycle-specific gloves with palm sliders and knuckle protection are ideal, but sturdy leather gloves that fully cover your fingers and wrists are acceptable. Avoid thin fabric gloves — they offer almost no abrasion resistance.

**Jacket.** A motorcycle jacket with CE-rated armour at the shoulders and elbows is the best option, but most schools accept a sturdy denim or leather jacket as a minimum. Avoid hoodies, thin waterproofs, or anything loose that could snag on the controls. If you're buying gear specifically for CBT, look for CE Level 1 armour at minimum — Level 2 gives better impact absorption.

**Boots and trousers.** Wear ankle-covering boots with a sole that grips the foot pegs — ideally motorcycle boots, but sturdy leather or work boots are usually fine. Trainers, sandals, and anything that doesn't cover the ankle are not acceptable. For trousers, motorcycle trousers with CE-rated knee armour are recommended; standard jeans are typically accepted but offer minimal protection in a slide. Never wear shorts or thin leggings. Check your provider's confirmation email for their exact requirements — do this the week before so you have time to sort anything missing.

**Your provisional licence photocard.** This is the one document you cannot forget. Without the credit-card-sized photocard version, your training cannot legally go ahead — the old paper-only provisional is no longer valid. Before CBT day, check two things: first, the address on the card must match your current home address (update it free via gov.uk if needed); second, check the expiry date — provisional licences require renewal every 10 years. Apply for replacements through the DVLA as early as possible if anything is out of order.

**Other documents.** If you already hold a full car licence, bring it — it can affect what you're permitted to ride after CBT. Some providers ask for your booking confirmation email; a few require proof of insurance if you're bringing your own bike. Take a phone photo of your licence as a backup, but the physical card is what your instructor needs. Keep it somewhere accessible on the day, not buried at the bottom of a bag.

**The evening before.** Spend 15 minutes getting everything ready. Lay out your full kit: helmet (or note that the school is providing one), gloves, jacket, boots, and trousers. Check the weather forecast and pack a waterproof layer — CBT is not cancelled for rain and you will be outside most of the day. Get your documents together. Set an alarm that gives you time to eat a proper breakfast; set a second if you need it. Look up the journey to the training centre and plan to arrive 10–15 minutes early.

**On the morning.** Eat a solid breakfast and stay hydrated — CBT days run 6–8 hours with only short breaks, and low energy affects concentration. Avoid alcohol the night before. Get a decent night's sleep; tiredness slows reaction time noticeably. If you wear glasses or contacts, make sure you have them — you will need to pass a 20-metre eyesight test before you can start riding. Bring a packed lunch and water if the school does not provide food. When you arrive, put your phone away — your instructor will ask you to, and your full attention on the road is what gets you through the day.`,
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SUBSECTION E: Common Mistakes & How to Avoid Them
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-common-mistakes",
      slug: "common-mistakes",
      title: "Common Mistakes & How to Avoid Them",
      description:
        "Practical tips from real CBT experience. What actually trips people up — and how to avoid it.",
      order: 5,
      estimatedTime: "~15 min",
      icon: "ShieldAlert",
      lessons: [
        {
          id: "les-cm-1",
          slug: "cbt-mistakes",
          title: "Common Mistakes & How to Avoid Them",
          order: 1,
          estimatedReadTime: "12 min",
          youtubeVideoId: "O4dTbtUR8KU",
          keyTakeaway:
            "The three most common CBT problems are target fixation, tense arms, and rushing the clutch. Pair these with consistent mirror checks and lifesaver glances, and you will be well ahead of most first-time riders.",
          content: `CBT is not a test you can fail, but certain habits trip up the same riders time and again. This lesson covers every significant mistake — on the bike, in manoeuvres, and on the road — so you can recognise and correct them before your training day.

**Target fixation.** Where you look is where you steer — this is the single most important principle in motorcycle riding. If you stare at a cone you want to avoid, you will ride straight into it. If you look at the kerb, the bike will drift towards it. During on-site manoeuvres, train yourself to look through the turn to where you want to end up, not at the obstacle in front of you. It feels unnatural at first, but your steering will follow your eyes automatically.

**Tense arms and grip.** Gripping the handlebars too tightly prevents you from steering smoothly and makes the bike feel unstable. Think of holding a bird — firm enough for control, not so tight you are rigid. Consciously drop your shoulders, relax your elbows, and breathe. If you notice yourself tensing up, that tension is usually a sign that something else is wrong — slow down, relax your grip, and reset.

**Stalling and clutch control.** Rushing through the clutch friction point is the main cause of stalls. Find the biting point, hold it there for a second, add a small amount of throttle, then release the clutch slowly and progressively. Stalling is completely normal during CBT — every rider does it. What matters is understanding why: either the throttle was too low, or the clutch came up too fast. Identify which, correct it, and move on.

**Slow speed and manoeuvres.** At walking pace, the throttle and clutch work together differently than at normal speed. You need more throttle than feels natural — the engine revs provide gyroscopic stability that keeps the bike upright. Use the clutch to control your actual speed by holding it at or near the biting point (slipping the clutch). For U-turns, look over your shoulder to where you want to end up before you start turning — the bike will follow your head. Counter-intuitively, tighter turns need slightly more throttle, not less, to stay stable. For figure-of-eights, going fractionally faster actually makes balancing easier; resist the urge to go as slowly as possible.

**Emergency stop.** Apply both brakes firmly and progressively — the front brake provides around 70% of stopping power, so do not neglect it, but do not grab it suddenly either. Squeeze progressively to avoid locking the front wheel, and pull the clutch in at the same time to prevent stalling. On a wet surface, progressive application is even more critical.

**Mirrors and observation.** Mirrors should be a constant habit, not a one-off check before a manoeuvre. Check them every few seconds as you ride — before any change of speed, change of direction, or approach to a hazard. The sequence your instructor expects is always: **mirrors first, signal, then manoeuvre**. Missing mirror checks is one of the most common reasons the on-road element takes longer than expected.

**Lifesaver checks.** Mirrors do not cover your full blind spot — the zone just behind and to the side of you where a vehicle can sit without appearing in the mirror. A lifesaver check is a quick, deliberate glance over your shoulder immediately before turning, changing lane, or pulling away from a junction. Your instructor will be watching specifically for these. At a junction, the full sequence is: check mirrors on approach → signal → position → check mirrors again → look right, left, right → lifesaver glance in the direction of your turn → proceed when safe. It sounds like a lot, but it becomes one fluid movement with practice.

**Confidence and mindset.** Some riders struggle not with skill but with anxiety — the fear of being watched, of making mistakes, of not being good enough. Your instructor has trained thousands of complete beginners. Nothing you do will surprise them, and catching you out is not their job. The more relaxed and open you are to feedback, the faster the day will go. If something goes wrong, say so — your instructor would rather you flag it than push through and repeat the same error.`,
        },
      ],
    },
  ],
};

// ─── Convenience exports ──────────────────────────────────────────────────────
// Backward-compatible exports so existing imports keep working during migration.

export const modules = course.modules;

export const totalLessons = modules.reduce(
  (sum, m) => sum + m.lessons.length,
  0
);

// ─── Course Catalogue ─────────────────────────────────────────────────────────
// All 7 courses from the PRD Rider Journey → Course Map.
// V1 launches with Pre-CBT only; others are stubs for the catalogue page.

export interface CatalogueCourse {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stage: string;
  phase: string;
  moduleCount: number;
  comingSoon: boolean;
  icon: string; // lucide icon name
}

export const catalogue: CatalogueCourse[] = [
  {
    slug: "pre-cbt",
    title: "Pre-CBT Training",
    tagline: "I've booked my CBT. What do I need to know?",
    description:
      "Everything you need to know before your motorcycle training day — from Highway Code essentials to what to pack.",
    stage: "Pre-CBT",
    phase: "V1",
    moduleCount: 5,
    comingSoon: false,
    icon: "Bike",
  },
  {
    slug: "theory-test",
    title: "Theory Test Preparation",
    tagline: "I've done my CBT. Now I need to pass my theory test.",
    description:
      "Master the motorcycle theory test — 50 multiple choice questions and 14 hazard perception clips, mapped to all official DVSA categories.",
    stage: "Post-CBT",
    phase: "V2",
    moduleCount: 5,
    comingSoon: true,
    icon: "BookCheck",
  },
  {
    slug: "pre-full-licence",
    title: "Pre-Full Licence (DAS/A2)",
    tagline: "I've booked my DAS/A2. What's different from CBT?",
    description:
      "Prepare for your Mod 1 and Mod 2 tests — understand the format, practise the manoeuvres, and upgrade your riding from 125cc.",
    stage: "Pre-Full Licence",
    phase: "V2/V3",
    moduleCount: 4,
    comingSoon: true,
    icon: "Award",
  },
  {
    slug: "auto-to-manual",
    title: "Auto to Manual Gear Conversion",
    tagline: "I did CBT on a scooter. Now I want to ride a geared bike.",
    description:
      "Transition from automatic scooter to manual geared motorcycle — clutch control, gear shifting, and building confidence on a geared bike.",
    stage: "Gear Transition",
    phase: "V2",
    moduleCount: 4,
    comingSoon: true,
    icon: "Settings",
  },
  {
    slug: "english-for-riders",
    title: "English for Motorcycle Training",
    tagline: "English isn't my first language. Help me understand the training.",
    description:
      "Motorcycle-specific vocabulary, road sign language, instructor commands, and key Highway Code terms in simple English.",
    stage: "Language Support",
    phase: "V2",
    moduleCount: 4,
    comingSoon: true,
    icon: "Languages",
  },
  {
    slug: "gear-guide",
    title: "Motorcycle Gear Guide",
    tagline: "I've got my licence/CBT. What should I buy?",
    description:
      "Choose your first bike, understand essential riding gear, sort insurance and tax, and learn basic maintenance checks.",
    stage: "Post-Licence",
    phase: "V3",
    moduleCount: 4,
    comingSoon: true,
    icon: "ShieldCheck",
  },
  {
    slug: "advanced-riding",
    title: "Advanced Riding Techniques",
    tagline: "I want to become a better, safer rider.",
    description:
      "Advanced observation, cornering technique, group riding, and handling challenging weather and road conditions.",
    stage: "Ongoing",
    phase: "V3+",
    moduleCount: 4,
    comingSoon: true,
    icon: "Gauge",
  },
];
