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
  quiz: Quiz;
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
  modules: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MODULE 1: Highway Code for CBT Riders
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-highway-code",
      slug: "highway-code",
      title: "Highway Code for CBT Riders",
      description:
        "The road rules you'll actually encounter during your CBT road ride. Not the full Highway Code — just what matters for a new rider on a 125cc.",
      order: 1,
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
      quiz: {
        id: "quiz-highway-code",
        title: "Highway Code Quiz",
        description:
          "Test your knowledge of right of way, junction rules, roundabout positioning, and crossing rules.",
        passingScore: 70,
        questions: [
          {
            id: "q-hc-1",
            questionText: "At a roundabout, which vehicles have priority?",
            options: [
              "Vehicles approaching from your left",
              "The largest vehicle at the roundabout",
              "Traffic already on the roundabout, coming from your right",
              "The first vehicle to reach the roundabout",
            ],
            correctAnswerIndex: 2,
            explanation:
              "At roundabouts you must give way to traffic already on the roundabout, which comes from your right. Always check for motorcycles and cyclists who can be difficult to spot.",
          },
          {
            id: "q-hc-2",
            questionText:
              "What does a give way sign (inverted triangle) require you to do?",
            options: [
              "Stop completely, then proceed",
              "Be prepared to stop and give priority to traffic on the main road",
              "Slow down but you always have priority",
              "Flash your headlights to signal your intention",
            ],
            correctAnswerIndex: 1,
            explanation:
              "A give way sign means you must be prepared to stop and let traffic on the main road pass before you proceed. Unlike a stop sign, you do not have to stop if the road is clear.",
          },
          {
            id: "q-hc-3",
            questionText:
              "At an unmarked crossroads with no signs, who has priority?",
            options: [
              "The vehicle travelling fastest",
              "Traffic approaching from your left",
              "No one has automatic priority — give way to traffic from the right and proceed with caution",
              "The vehicle that arrived first",
            ],
            correctAnswerIndex: 2,
            explanation:
              "At unmarked crossroads, the convention is to give way to traffic from the right, but no one has automatic legal priority. Always proceed with extreme caution and make eye contact where possible.",
          },
          {
            id: "q-hc-4",
            questionText:
              "When turning right at a T-junction, where should you position your motorcycle?",
            options: [
              "Close to the left kerb",
              "In the centre of your lane",
              "Just left of the centre line",
              "On the centre line itself",
            ],
            correctAnswerIndex: 2,
            explanation:
              "When turning right, position just left of the centre line. This makes your intention clear to other road users and protects you from oncoming traffic. Signal clearly and well in advance.",
          },
          {
            id: "q-hc-5",
            questionText:
              "What is the MSM routine you should follow at every junction?",
            options: [
              "Move, Steer, Merge",
              "Mirror, Signal, Manoeuvre",
              "Mirror, Speed, Move",
              "Monitor, Signal, Merge",
            ],
            correctAnswerIndex: 1,
            explanation:
              "MSM stands for Mirror, Signal, Manoeuvre. Check your mirrors to see what is behind you, signal your intention in good time, then carry out the manoeuvre when it is safe to do so.",
          },
          {
            id: "q-hc-6",
            questionText:
              "What must you do at a zebra crossing when a pedestrian has stepped onto the stripes?",
            options: [
              "Sound your horn to warn them",
              "Give way — the pedestrian has priority",
              "Proceed if you can safely pass behind them",
              "Flash your headlights to let them know you have seen them",
            ],
            correctAnswerIndex: 1,
            explanation:
              "At a zebra crossing, pedestrians have priority once they have stepped onto the crossing. You must stop and wait for them to finish crossing before proceeding.",
          },
          {
            id: "q-hc-7",
            questionText:
              "During a flashing amber light at a pelican crossing, what should you do?",
            options: [
              "Stop regardless of whether pedestrians are present",
              "Proceed only if the crossing is completely clear of pedestrians",
              "Treat it as a green light and proceed normally",
              "Sound your horn to alert pedestrians",
            ],
            correctAnswerIndex: 1,
            explanation:
              "During flashing amber at a pelican crossing, you may proceed only if the crossing is completely clear. If pedestrians are still crossing, you must wait for them to finish.",
          },
          {
            id: "q-hc-8",
            questionText:
              "On a multi-lane roundabout, which lane should you use to take the first exit (turning left)?",
            options: [
              "The right lane, signalling left",
              "Either lane — it does not matter",
              "The left lane, signalling left on approach",
              "The right lane, then move left on the roundabout",
            ],
            correctAnswerIndex: 2,
            explanation:
              "For the first exit (turning left), use the left lane and signal left on approach. Maintain your signal as you exit the roundabout.",
          },
          {
            id: "q-hc-9",
            questionText:
              "Why are motorcyclists particularly vulnerable at junctions?",
            options: [
              "Motorcycles cannot stop as quickly as cars",
              "Motorcyclists always have to give way",
              "Motorcycles are smaller and harder for other drivers to see",
              "Motorcycle engines are louder, distracting other drivers",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Motorcycles are smaller and much harder for other road users to see, especially at junctions. This is why defensive riding and making yourself visible are so important during your CBT road ride.",
          },
          {
            id: "q-hc-10",
            questionText:
              "What type of crossing uses sensors so there is no flashing amber phase?",
            options: [
              "Zebra crossing",
              "Pelican crossing",
              "Puffin crossing",
              "Toucan crossing",
            ],
            correctAnswerIndex: 2,
            explanation:
              "A puffin crossing uses sensors to detect pedestrians on the crossing. The lights stay red until the crossing is clear, so there is no flashing amber phase — making them safer for pedestrians.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MODULE 2: Traffic Signs & Signals
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-traffic-signs",
      slug: "traffic-signs",
      title: "Traffic Signs & Signals",
      description:
        "Visual, quiz-heavy module. Know your signs before you're on the road.",
      order: 2,
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
      quiz: {
        id: "quiz-traffic-signs",
        title: "Traffic Signs Quiz",
        description:
          "Test your knowledge of warning signs, regulatory signs, traffic lights, and road markings.",
        passingScore: 70,
        questions: [
          {
            id: "q-ts-1",
            questionText: "What shape are warning signs in the UK?",
            options: [
              "Circular with a red border",
              "Rectangular with a blue background",
              "Triangular with a red border",
              "Diamond-shaped with a yellow background",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Warning signs are triangular with a red border on a white background. They alert you to hazards ahead such as sharp bends, junctions, pedestrian crossings, or slippery roads.",
          },
          {
            id: "q-ts-2",
            questionText:
              "What does a red circular sign with a number inside it indicate?",
            options: [
              "A recommended speed",
              "A maximum speed limit",
              "A minimum speed limit",
              "A speed camera zone",
            ],
            correctAnswerIndex: 1,
            explanation:
              "A red-bordered circle with a number indicates the maximum speed limit. You must not exceed this speed. A blue circle with a number inside indicates a minimum speed limit.",
          },
          {
            id: "q-ts-3",
            questionText:
              "What does a red circle containing a horizontal white bar mean?",
            options: [
              "No U-turns",
              "No entry",
              "Give way to oncoming traffic",
              "No through road",
            ],
            correctAnswerIndex: 1,
            explanation:
              "A red circle with a horizontal white bar is the no entry sign. You will often see it at one-way streets or restricted access roads. Entering a road displaying this sign is illegal and dangerous.",
          },
          {
            id: "q-ts-4",
            questionText:
              "What shape and colour are direction signs on a motorway?",
            options: [
              "Green and rectangular",
              "White and rectangular",
              "Blue and rectangular",
              "Yellow and rectangular",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Motorway signs are blue and rectangular. Primary A-road signs are green, and local direction signs are white. Knowing the colours helps you navigate quickly at speed.",
          },
          {
            id: "q-ts-5",
            questionText:
              "What does a solid white centre line along the middle of the road mean?",
            options: [
              "You may overtake if it is safe to do so",
              "No parking on either side of the road",
              "You must not cross or straddle the line",
              "The road narrows ahead",
            ],
            correctAnswerIndex: 2,
            explanation:
              "A solid white centre line means you must not cross or straddle it. It appears on bends, hills, or near junctions where overtaking is particularly dangerous.",
          },
          {
            id: "q-ts-6",
            questionText: "What do double yellow lines along the kerb indicate?",
            options: [
              "No stopping at any time",
              "No parking at any time",
              "No parking during certain hours",
              "Permit holders only",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Double yellow lines mean no parking at any time. Single yellow lines indicate parking restrictions during certain hours, shown on nearby signs. Double red lines mean no stopping at any time.",
          },
          {
            id: "q-ts-7",
            questionText:
              "During the standard traffic light sequence, what does red and amber showing together mean?",
            options: [
              "Go — the light is about to turn green",
              "Stop — the light is about to turn red",
              "Prepare to go but do not move until the light turns green",
              "Proceed with caution if the road is clear",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Red and amber together means the light is about to change to green. Prepare to go — engage first gear and find your clutch biting point — but do not move until the light turns green.",
          },
          {
            id: "q-ts-8",
            questionText:
              "What does a yellow criss-cross box junction marked on the road mean?",
            options: [
              "No parking at any time",
              "Give way to traffic from the right",
              "You must not enter unless your exit is clear",
              "Priority for buses and cyclists only",
            ],
            correctAnswerIndex: 2,
            explanation:
              "You must not enter a box junction unless your exit road or lane is clear. The only exception is when turning right — you may wait in the box if held up by oncoming traffic.",
          },
          {
            id: "q-ts-9",
            questionText:
              "What does the national speed limit sign look like?",
            options: [
              "A blue circle with a white number",
              "A white circle with a diagonal grey stripe",
              "A red circle with no number inside",
              "A green rectangular sign with white text",
            ],
            correctAnswerIndex: 1,
            explanation:
              "The national speed limit sign is a white circle with a diagonal grey stripe. The actual limit depends on the road type: 30mph in built-up areas, 60mph on single carriageways, 70mph on dual carriageways.",
          },
          {
            id: "q-ts-10",
            questionText:
              "A green filter arrow is showing but the main traffic light is red. What should you do?",
            options: [
              "Stop — the red light takes priority",
              "Proceed in the direction of the filter arrow if the road is clear",
              "Proceed in any direction",
              "Flash your headlights and proceed with caution",
            ],
            correctAnswerIndex: 1,
            explanation:
              "A green filter arrow allows you to proceed in the direction shown, even when the main light is red. Only move in the direction indicated by the arrow, and make sure the road ahead is clear.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MODULE 3: Your CBT Day — What to Expect
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-cbt-day",
      slug: "cbt-day",
      title: "Your CBT Day — What to Expect",
      description:
        "Walk through exactly what happens on your training day, element by element. The anxiety killer.",
      order: 3,
      estimatedTime: "~20 min",
      icon: "ClipboardList",
      lessons: [
        {
          id: "les-cd-1",
          slug: "5-elements-overview",
          title: "The 5 Elements of CBT (Overview)",
          order: 1,
          estimatedReadTime: "7 min",
          keyTakeaway:
            "CBT is structured training, not a test. It has 5 elements (A–E), takes 5–8 hours, and most riders complete it in one day.",
          content: `CBT (Compulsory Basic Training) is structured into five distinct elements. These aren't tests — they're a training programme designed to ensure you can ride safely on public roads. You must complete all five elements on the same day with the same approved training body (ATB).

Element A is the introduction: your instructor explains what the day involves, checks your eyesight, and makes sure you understand the basics. Element B covers practical on-site training — learning the controls of the bike while it's stationary. Element C is on-site riding, where you practise low-speed manoeuvres in a safe environment. Element D is theory — covering road safety and the rules you need to know. Element E is the on-road riding, where you ride on public roads accompanied by your instructor.

There's no pass or fail grade — your instructor will tell you when they're satisfied you can ride safely. If you're not ready for the on-road element by the end of the day, your training can continue on another day. Most riders complete CBT in a single session of around 5–8 hours.

What 'completion' means: once your instructor is satisfied with all five elements, they will issue your DL196 certificate. This allows you to ride on public roads on a provisional licence, with L-plates displayed, for up to two years. It is not a full licence — it is confirmation that you have been trained in the basics.`,
        },
        {
          id: "les-cd-2",
          slug: "element-a-b",
          title: "Element A & B — Introduction, Eyesight Test & Controls",
          order: 2,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "The eyesight test requires you to read a number plate at 20.5 metres. Element B teaches you the bike controls while stationary — throttle, clutch, brakes, gears, and indicators.",
          content: `When you arrive at the training centre, your instructor will begin with Element A: introductions and administration. They will explain the structure of the day, check your provisional licence, and carry out the eyesight check. You will be asked to read a standard number plate at a distance of 20.5 metres (about 20 car lengths). If you need glasses or contact lenses to do this, you must wear them whenever you ride — this will be noted on your CBT certificate.

The instructor ratio is important: there should be no more than two students per instructor for on-road riding (Element E), though on-site elements can have up to four students per instructor. Smaller groups mean more personal attention.

Element B is where you first interact with the motorcycle. Your instructor will walk you through every control: the throttle (right hand twist grip), clutch lever (left hand), front brake (right hand lever), rear brake (right foot pedal), gear lever (left foot), indicators, horn, lights, and kill switch. You will learn how to mount and dismount safely, how to use the stand, and how to push the bike while walking alongside it.

This element happens with the engine off at first, then progressing to engine running. Take your time to understand where every control is — you will be using them all simultaneously very soon. Ask your instructor to repeat anything that is not clear. There are no silly questions at this stage.`,
        },
        {
          id: "les-cd-3",
          slug: "element-c-d",
          title: "Element C & D — Off-Road Riding & Road Safety Briefing",
          order: 3,
          estimatedReadTime: "6 min",
          keyTakeaway:
            "Element C teaches low-speed bike control in a safe area — figure of 8, U-turns, emergency stops. Element D covers road safety theory through structured discussion.",
          content: `Element C is where riding begins. In a private training area with no traffic, you will practise the fundamental skills of motorcycle control. Your instructor will guide you through a progression of exercises designed to build confidence and competence.

The exercises typically include: riding in a straight line and stopping, figure-of-eight circuits, U-turns, slalom (weaving between cones), and emergency stops. All of these are done at low speed — the focus is on control and balance, not speed. The most common sticking point for new riders is slow-speed balance, particularly during U-turns and figure-of-eights. The trick is to use a little more throttle than feels comfortable, slip the clutch to control speed, and look where you want to go — not at the ground.

Your instructor will not move you to the road until they are satisfied with your control. This is for your safety. If you need extra time on a particular exercise, that is completely normal.

Element D is the theory and road safety briefing, usually delivered during a natural break in the day. Your instructor will cover: the importance of protective clothing, basic road positioning, observation skills, the dangers of drink and drug riding, and what to do in an emergency. This is not a formal written test — it is a structured conversation. Having studied the Highway Code basics before your CBT (which you are doing right now) means you will feel confident contributing to this discussion.`,
        },
        {
          id: "les-cd-4",
          slug: "element-e-on-road",
          title: "Element E — On-Road Riding",
          order: 4,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "You will ride on public roads for at least 2 hours with radio-linked instructor guidance. Completing Element E earns you your DL196 certificate.",
          content: `Element E is the final — and most exciting — part of CBT. You will ride on public roads for a minimum of two hours, accompanied by your instructor who follows on their own motorcycle. Communication is usually via a radio earpiece fitted inside your helmet, so your instructor can give you directions and coaching in real time.

The route is chosen by your instructor and typically covers a mix of road types: residential streets, A-roads, junctions, roundabouts, and sometimes dual carriageways. They will choose routes appropriate to your ability, starting with quieter roads and gradually introducing busier junctions and more complex traffic situations.

During the road ride, you will be expected to: observe and comply with all traffic signals and signs, position yourself correctly on the road, signal clearly and in good time, check mirrors before every manoeuvre, carry out lifesaver checks (looking over your shoulder before turning or changing lane), and ride at an appropriate speed for the conditions.

If at any point you feel unsafe or overwhelmed, you can pull over safely and speak to your instructor. The session is designed to build your confidence, not test you under pressure. Most riders finish the on-road element feeling surprised at how natural it felt — especially after the groundwork laid by the earlier elements.

Once your instructor is satisfied that you can ride safely and independently on the road, they will issue your DL196 certificate: your CBT completion card. This allows you to ride any motorcycle or scooter up to 125cc with L-plates on public roads (except motorways) for up to two years.`,
        },
      ],
      quiz: {
        id: "quiz-cbt-day",
        title: "CBT Day Quiz",
        description:
          "Test your understanding of what happens during CBT — the 5 elements, requirements, and what to expect.",
        passingScore: 70,
        questions: [
          {
            id: "q-cd-1",
            questionText: "What does CBT stand for?",
            options: [
              "Competency Based Training",
              "Compulsory Basic Training",
              "Certified Bike Test",
              "Core Bike Training",
            ],
            correctAnswerIndex: 1,
            explanation:
              "CBT stands for Compulsory Basic Training. It is a mandatory training programme for anyone who wants to ride a motorcycle or moped on public roads in the UK on a provisional licence.",
          },
          {
            id: "q-cd-2",
            questionText: "How many elements does CBT consist of?",
            options: [
              "3 elements",
              "4 elements",
              "5 elements",
              "6 elements",
            ],
            correctAnswerIndex: 2,
            explanation:
              "CBT has 5 elements: A (Introduction and eyesight check), B (Practical on-site training), C (On-site riding), D (Theory and road safety), and E (On-road riding).",
          },
          {
            id: "q-cd-3",
            questionText:
              "At what distance must you read a number plate for the CBT eyesight check?",
            options: [
              "15 metres",
              "20 metres",
              "20.5 metres",
              "25 metres",
            ],
            correctAnswerIndex: 2,
            explanation:
              "You must read a standard number plate at 20.5 metres (approximately 20 car lengths). If you need glasses or contact lenses, you must always wear them when riding.",
          },
          {
            id: "q-cd-4",
            questionText:
              "Which element of CBT covers on-site riding manoeuvres such as U-turns and figure-of-eights?",
            options: [
              "Element B",
              "Element C",
              "Element D",
              "Element E",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Element C is on-site riding, where you practise manoeuvres including figure-of-eights, U-turns, slalom, and emergency stops in a private area away from traffic.",
          },
          {
            id: "q-cd-5",
            questionText:
              "What document do you receive after successfully completing CBT?",
            options: [
              "A provisional motorcycle licence upgrade",
              "Form DL196",
              "A full A1 category licence",
              "A theory test exemption certificate",
            ],
            correctAnswerIndex: 1,
            explanation:
              "You receive Form DL196 — the CBT certificate. It allows you to ride a motorcycle up to 125cc displaying L-plates on public roads (except motorways). It is valid for two years.",
          },
          {
            id: "q-cd-6",
            questionText:
              "What is the minimum on-road riding time required for Element E?",
            options: [
              "30 minutes",
              "1 hour",
              "2 hours",
              "3 hours",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Element E requires a minimum of two hours of riding on public roads. Your instructor follows on a motorcycle and communicates via a radio earpiece.",
          },
          {
            id: "q-cd-7",
            questionText: "Can you carry a pillion passenger after completing CBT?",
            options: [
              "Yes, if the passenger also holds a CBT certificate",
              "Yes, after riding for six months",
              "No — carrying passengers requires a full licence",
              "Yes, with no restrictions",
            ],
            correctAnswerIndex: 2,
            explanation:
              "After CBT you cannot carry passengers, cannot use motorways, and must display L-plates. Pillion passengers are only permitted once you hold a full motorcycle licence.",
          },
          {
            id: "q-cd-8",
            questionText:
              "How long does a typical CBT day last from start to finish?",
            options: [
              "2–3 hours",
              "3–4 hours",
              "5–8 hours",
              "Exactly 8 hours",
            ],
            correctAnswerIndex: 2,
            explanation:
              "CBT typically takes 5–8 hours. The duration depends on how quickly each student progresses. If you are not ready for on-road riding, training can continue on a subsequent day.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MODULE 4: Common Mistakes & How to Avoid Them
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-common-mistakes",
      slug: "common-mistakes",
      title: "Common Mistakes & How to Avoid Them",
      description:
        "Practical tips from real CBT experience. What actually trips people up — and how to avoid it.",
      order: 4,
      estimatedTime: "~15 min",
      icon: "ShieldAlert",
      lessons: [
        {
          id: "les-cm-1",
          slug: "top-cbt-fail-points",
          title: "Top CBT Fail Points",
          order: 1,
          estimatedReadTime: "6 min",
          keyTakeaway:
            "The most common CBT problems are target fixation (looking at what you want to avoid), tense arms, and rushing the clutch. All are fixable with awareness.",
          content: `CBT is not a test you can fail, but there are common issues that prevent riders from completing all five elements in a single day. Knowing what these are — and how to avoid them — gives you a significant advantage.

The number one issue is target fixation: looking at what you want to avoid rather than where you want to go. Where you look is where you steer — this is a fundamental principle of motorcycle riding. During on-site manoeuvres, if you look at a cone, you will ride into it. If you look at the kerb, you will head towards it. Actively practise directing your gaze to where you want the bike to end up, not at obstacles.

Gripping the handlebars too tightly is the second most common problem. Tense arms prevent you from steering smoothly and absorb no road vibration, making the bike feel unstable. Think of it like holding a bird — firm enough to keep control, but not so tight that you are rigid. Consciously drop your shoulders and relax your elbows. If you notice yourself going stiff, take a breath and loosen your grip.

Rushing through the clutch friction point is the main cause of stalls. Many beginners release the clutch too quickly, killing the engine before the bike has enough momentum. The fix is to find the biting point, hold it there for a moment, open the throttle slightly, and then release the clutch slowly and progressively. Stalling is completely normal during CBT — every rider does it at some point. The important thing is understanding why it happened so you can correct it.

Finally, some riders struggle with confidence rather than skill. Anxiety about being judged or making mistakes in front of others can make everything harder. Remember: your instructor has seen thousands of complete beginners. Nothing you do will surprise them, and their entire job is to help you succeed.`,
        },
        {
          id: "les-cm-2",
          slug: "observation-mirror-checks",
          title: "Observation & Mirror Checks",
          order: 2,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Lifesaver checks (looking over your shoulder before turning) and regular mirror use are the #1 things instructors look for. Make them a habit before your CBT.",
          content: `Observation is the single most important skill your CBT instructor will assess during the on-road element. Good observation means you are aware of what is happening around you at all times — and you demonstrate this awareness through regular mirror checks and lifesaver glances.

Mirrors should be checked every few seconds as a matter of habit, not just before you do something. Before changing speed, changing direction, or approaching any hazard, you must check your mirrors to know what is behind and beside you. The sequence is always: mirrors first, then signal, then manoeuvre.

Lifesaver checks are the quick glance over your shoulder immediately before you turn, change lane, or pull away. They cover the blind spot that mirrors cannot reach — the area just behind and to the side of you where a vehicle could be without appearing in your mirrors. Your instructor will be watching specifically for these. Failure to carry out lifesaver checks is one of the most common reasons riders are asked to repeat parts of the on-road element.

A good observation routine at a junction looks like this: check mirrors on approach, signal your intention, position correctly, check mirrors again, look left and right (and left again), carry out a lifesaver check in the direction you are turning, then proceed when safe. It sounds like a lot of steps, but with practice it becomes a single flowing sequence.

The golden rule is: if you are not sure whether something is there, look. Looking costs you nothing. Not looking could cost you everything.`,
        },
        {
          id: "les-cm-3",
          slug: "slow-speed-control",
          title: "Slow Speed Control & Manoeuvres",
          order: 3,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Slow speed control is all about clutch and throttle coordination. Use more throttle than feels natural, slip the clutch, and look where you want to go.",
          content: `Slow speed control is the skill that separates a nervous beginner from a confident new rider. During Element C of your CBT, you will practise manoeuvres that require you to ride at walking pace or slower — and this is where many riders struggle most.

The key to slow speed control is the relationship between throttle and clutch. At very low speeds, you need more engine power than you think — a slightly higher throttle setting provides the gyroscopic stability that keeps the bike upright. The clutch controls your actual speed: by "slipping" the clutch (holding it at or near the biting point), you can maintain a constant crawling speed regardless of how much throttle you are applying.

For U-turns, the technique is: look over your shoulder to where you want to end up, apply a little more throttle, slip the clutch to control speed, and lean the bike while keeping your body relatively upright. Counter-intuitively, the tighter the turn, the more throttle you need — because the bike needs to maintain stability through the turn. Dragging the rear brake lightly can also help smooth out your speed control.

Figure-of-eight exercises combine everything: clutch control, throttle management, steering input, and head movement. The most common mistake is trying to do it too slowly — a slightly faster pace makes balancing much easier. Start wider and gradually tighten your circles as your confidence builds.

For the emergency stop, the technique is to apply both brakes firmly and progressively (front brake provides about 70% of stopping power) while pulling in the clutch to prevent stalling. Do not grab the front brake suddenly, especially on a wet surface — progressive application prevents the front wheel from locking.`,
        },
      ],
      quiz: {
        id: "quiz-common-mistakes",
        title: "Common Mistakes Quiz",
        description:
          "Test your understanding of common CBT mistakes, observation technique, and manoeuvre skills.",
        passingScore: 70,
        questions: [
          {
            id: "q-cm-1",
            questionText:
              "What is 'target fixation' and why does it matter for CBT?",
            options: [
              "The tendency to ride faster than you intend",
              "The tendency to steer towards whatever you are looking at",
              "Focusing too much on the bike's instruments while riding",
              "Braking too hard when approaching a hazard",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Target fixation is the instinct to steer towards what you are looking at. During on-site manoeuvres, looking at cones means you are likely to ride into them. Always look to where you want to go.",
          },
          {
            id: "q-cm-2",
            questionText:
              "If your motorcycle wobbles at slow speed during CBT, what is the best response?",
            options: [
              "Apply both brakes immediately to regain control",
              "Put both feet down straight away",
              "Slightly increase throttle and look ahead",
              "Lean heavily to the opposite side to correct",
            ],
            correctAnswerIndex: 2,
            explanation:
              "A small increase in throttle creates gyroscopic stability that calms a slow-speed wobble. Counter-intuitively, a little more speed helps. Braking or tensing up makes a wobble worse.",
          },
          {
            id: "q-cm-3",
            questionText:
              "What is the 'friction point' (biting point) on a motorcycle clutch?",
            options: [
              "The point where the rear brake fully engages",
              "The point where the clutch begins transferring power to the rear wheel",
              "The maximum lean angle before losing tyre grip",
              "The point where the throttle becomes fully responsive",
            ],
            correctAnswerIndex: 1,
            explanation:
              "The friction point is where the clutch plates begin to engage and drive transfers to the wheel. Mastering slow feathering at this point is the most important skill for low-speed control.",
          },
          {
            id: "q-cm-4",
            questionText:
              "What is the most common reason learner riders stall during CBT?",
            options: [
              "Selecting the wrong gear",
              "Releasing the clutch too quickly",
              "Applying too much throttle",
              "Forgetting to turn the ignition on",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Releasing the clutch too quickly before sufficient revs have built is the most common cause. The fix: find the friction point, hold it, open the throttle slightly, then release slowly.",
          },
          {
            id: "q-cm-5",
            questionText: "What is a 'lifesaver check' in motorcycle riding?",
            options: [
              "Checking your mirrors every 30 seconds",
              "A quick glance over your shoulder before turning or changing lane",
              "Testing both brakes before setting off",
              "Checking your tyre pressure before every ride",
            ],
            correctAnswerIndex: 1,
            explanation:
              "A lifesaver check is the quick shoulder glance that covers your blind spot immediately before you turn, change lane, or pull away. Instructors watch specifically for these during the road ride.",
          },
          {
            id: "q-cm-6",
            questionText:
              "During an emergency stop on a motorcycle, which brake provides the most stopping power?",
            options: [
              "The rear brake (right foot)",
              "The front brake (right hand)",
              "Both brakes provide equal stopping power",
              "It depends on the speed you are travelling",
            ],
            correctAnswerIndex: 1,
            explanation:
              "The front brake provides approximately 70% of your total stopping power. Apply both brakes firmly and progressively — never grab the front brake suddenly, as this can lock the front wheel.",
          },
          {
            id: "q-cm-7",
            questionText:
              "What is the correct observation routine when approaching a junction?",
            options: [
              "Signal, then check mirrors, then look right",
              "Mirrors, signal, position, mirrors again, look both ways, lifesaver check, then proceed",
              "Look left, look right, then proceed quickly",
              "Check mirrors once and signal at the last moment",
            ],
            correctAnswerIndex: 1,
            explanation:
              "The full routine is: mirrors on approach, signal, position correctly, mirrors again, look left-right-left, lifesaver check in your turning direction, then proceed when safe.",
          },
          {
            id: "q-cm-8",
            questionText:
              "When performing a U-turn at slow speed, what should you be looking at?",
            options: [
              "The front wheel to check your line",
              "The ground directly ahead of you",
              "Over your shoulder to where you want to end up",
              "Your mirrors to check for traffic behind",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Look over your shoulder to where you want the bike to end up. The bike follows your gaze. Looking down at the ground or front wheel causes the bike to go wide or lose balance.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MODULE 5: Gear, Documents & Checklist
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "mod-gear-docs",
      slug: "gear-docs",
      title: "Gear, Documents & Checklist",
      description:
        "Know exactly what to bring and wear on the day — no last-minute surprises. Directly reduces support tickets.",
      order: 5,
      estimatedTime: "~15 min",
      icon: "CheckSquare",
      lessons: [
        {
          id: "les-gd-1",
          slug: "what-to-wear",
          title: "What to Wear (Head to Toe)",
          order: 1,
          estimatedReadTime: "5 min",
          keyTakeaway:
            "Helmet (most schools provide one), gloves, sturdy jacket, ankle-covering boots, and trousers that protect your knees. Check with your training provider in advance.",
          content: `A helmet is legally required and must meet the British Standard BS 6658:1985, ECE 22.06, or an equivalent approved standard (look for the BSI Kitemark or UNECE mark). Your training provider will usually supply a helmet if you don't have your own, but check in advance. If you're buying your own, a full-face helmet gives the best protection; a jet (open-face) helmet is also acceptable but leaves your chin exposed.

Gloves are strongly recommended — your hands are one of the first things to hit the ground in a fall. Motorcycle-specific gloves with palm sliders and knuckle protection are ideal. At minimum, use sturdy leather gloves that cover your fingers and wrists completely. Avoid thin fabric gloves that would offer no abrasion protection.

For your jacket, a motorcycle jacket with CE-rated armour at the shoulders and elbows is best, but most training schools will accept a sturdy denim or leather jacket as a minimum. Avoid hoodies, thin waterproofs, or anything loose that could catch on the bike controls. If buying motorcycle-specific gear, look for CE Level 1 armour as a minimum — Level 2 provides even better impact absorption.

On your feet, wear ankle-covering boots — ideally motorcycle boots, but sturdy leather boots or work boots are usually acceptable. The key requirement is ankle protection and a sole that grips the foot pegs without slipping. Avoid trainers, sandals, or shoes that do not cover the ankle. For trousers, motorcycle trousers with CE-rated knee armour are recommended. Standard jeans offer minimal protection in a slide but are usually accepted. Avoid shorts or thin leggings.

Your training provider's website or confirmation email will list exactly what they require — check this the week before so you have time to source anything missing.`,
        },
        {
          id: "les-gd-2",
          slug: "documents-to-bring",
          title: "Documents You Must Bring",
          order: 2,
          estimatedReadTime: "4 min",
          keyTakeaway:
            "Your provisional licence photocard is essential — without it, training cannot go ahead. Check the address matches your current address and the card is not expired.",
          content: `The most important document is your provisional driving licence — specifically the photocard version. Without it, your training cannot legally proceed. The old paper-only provisional licences are no longer valid for this purpose; you need the credit-card-sized photocard. If you do not have one, apply through the DVLA well in advance of your training date.

Check two things on your licence before your CBT day. First, the address must match your current home address. If it doesn't, update it via the DVLA (this is free and can be done online at gov.uk). Riding with an incorrect address on your licence is technically an offence. Second, check the expiry date — provisional licences must be renewed every 10 years. If yours is close to expiry or recently applied for and not yet arrived, contact the DVLA as early as possible.

If you already hold a full car licence, bring that too — it can affect what you're permitted to ride after CBT. Some training providers also ask for proof of booking or a booking confirmation email. If you're bringing your own motorcycle (uncommon for first-time CBT), you may need proof of third-party insurance.

It's worth taking a photo of your licence on your phone as a backup, but your provider will need to see the physical card. On the day, keep it somewhere safe and easily accessible — not at the bottom of a bag buried under your gear.

In summary: your provisional licence photocard is the only document that is absolutely essential. Everything else is a bonus. But without that card, your training day will not happen.`,
        },
        {
          id: "les-gd-3",
          slug: "pre-cbt-checklist",
          title: "Your Pre-CBT Checklist",
          order: 3,
          estimatedReadTime: "4 min",
          keyTakeaway:
            "Prepare the evening before: lay out gear, confirm documents, check weather, plan your journey. On the morning: eat well, stay hydrated, arrive early.",
          content: `The evening before your CBT, spend 15 minutes going through everything you need. Lay out your gear: helmet (or confirm the school is providing one), gloves, jacket with armour or a sturdy alternative, ankle-covering boots, and riding trousers or tough jeans. Check the weather forecast and pack a waterproof layer — you will be outside all day, and wet conditions will not cancel your training.

Get your documents ready: provisional licence photocard and anything else your training provider has requested. Set an alarm that gives you enough time to eat a proper breakfast — you will be concentrating hard all day and energy levels matter. Check your journey to the training centre; plan to arrive 10–15 minutes early. Being late causes stress before you have even started.

On the morning, eat a solid breakfast and stay hydrated. Avoid alcohol the night before (this should be obvious, but it bears repeating). Get a good night's sleep — tiredness affects concentration and reaction time. If you wear glasses or contact lenses, make sure you have them with you. Bring a packed lunch and water if the school does not provide food — most training days are 6–8 hours with only short breaks.

Leave your phone in your bag during riding sessions. You will need your full attention on the road, and a phone in your pocket is a distraction and a hazard if you fall. Most instructors will ask you to put it away.

Finally: arrive with a positive mindset. Everyone is a beginner on their CBT day. Your instructor is there to help you succeed, not to catch you out. The more relaxed and open you are, the faster you will learn.`,
        },
      ],
      quiz: {
        id: "quiz-gear-docs",
        title: "Gear & Documents Quiz",
        description:
          "Test your knowledge of gear requirements, documentation, and preparation.",
        passingScore: 70,
        questions: [
          {
            id: "q-gd-1",
            questionText:
              "Which standard must a motorcycle helmet meet to be legal in the UK?",
            options: [
              "Only the latest ECE 22.06 standard",
              "Any helmet displaying a CE mark",
              "BS 6658:1985, ECE 22.06, or an equivalent approved standard",
              "Only full-face helmets are legal in the UK",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Your helmet must meet BS 6658:1985, ECE 22.06, or NTA 8776. Look for the BSI Kitemark or UNECE mark. Both open-face and full-face helmets are legal provided they meet the standard.",
          },
          {
            id: "q-gd-2",
            questionText:
              "What is the minimum acceptable footwear for motorcycle CBT?",
            options: [
              "Any closed-toe shoe",
              "Ankle-covering sturdy boots or shoes",
              "Trainers with thick socks",
              "Any footwear the training school approves",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Your ankles must be covered. Motorcycle boots offer the best protection, but sturdy leather work boots are generally accepted. Trainers and regular shoes provide no ankle protection.",
          },
          {
            id: "q-gd-3",
            questionText:
              "Which document is essential — without it your CBT cannot legally go ahead?",
            options: [
              "Proof of insurance",
              "Your photocard provisional driving licence",
              "A letter from a GP confirming fitness to ride",
              "Proof of your current home address",
            ],
            correctAnswerIndex: 1,
            explanation:
              "Your physical provisional licence photocard is required by law. Without it, the training provider cannot legally verify you are permitted to ride.",
          },
          {
            id: "q-gd-4",
            questionText: "How long is a CBT certificate (DL196) valid for?",
            options: [
              "1 year",
              "2 years",
              "3 years",
              "Until you pass your full motorcycle test",
            ],
            correctAnswerIndex: 1,
            explanation:
              "A CBT certificate is valid for exactly two years. If it expires before you obtain a full licence, you must complete CBT again before you can legally continue riding.",
          },
          {
            id: "q-gd-5",
            questionText:
              "Are learner riders permitted to use motorways after completing CBT?",
            options: [
              "Yes, as long as L-plates are displayed",
              "Yes, after six months of riding experience",
              "No — motorways are not permitted on a provisional licence",
              "Yes, if accompanied by a qualified motorcyclist",
            ],
            correctAnswerIndex: 2,
            explanation:
              "Learner riders on provisional licences cannot use motorways. This restriction applies until you hold a full licence.",
          },
          {
            id: "q-gd-6",
            questionText:
              "What is the minimum recommended CE armour level for a motorcycle jacket?",
            options: [
              "CE Level 1 armour at shoulders and elbows",
              "CE Level 2 at every joint",
              "Any motorcycle-branded jacket is sufficient",
              "CE armour is optional if the jacket is genuine leather",
            ],
            correctAnswerIndex: 0,
            explanation:
              "CE Level 1 armour at the shoulders and elbows is the minimum recommendation. CE Level 2 offers greater impact absorption. Back protectors are also strongly advisable.",
          },
        ],
      },
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
