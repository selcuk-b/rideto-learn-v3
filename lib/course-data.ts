export interface Lesson {
  slug: string;
  title: string;
  estimatedMinutes: number;
  content: string;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface Module {
  slug: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  quiz: Quiz;
}

export const modules: Module[] = [
  {
    slug: "highway-code",
    number: 1,
    title: "Highway Code Essentials",
    description: "Master the road signs, junctions, and rules you'll need to know inside out.",
    icon: "MapPin",
    lessons: [
      {
        slug: "road-signs-you-must-know",
        title: "Road Signs You Must Know",
        estimatedMinutes: 5,
        content: `Road signs are divided into three main categories: warning signs (triangular with a red border), regulatory signs (circular), and information signs (rectangular). Each category tells you something different about the road ahead, and recognising them instantly is a core part of safe riding.

Warning signs alert you to hazards ahead — things like sharp bends, junctions, pedestrian crossings, or slippery roads. Regulatory signs either prohibit or require certain actions. A red circle with a number inside it is a speed limit sign; a red circle with a horizontal white bar means no entry. These are legally binding and must be obeyed.

Information signs are there to help you navigate and understand the road environment. Blue rectangular signs on motorways, green signs on A-roads, and white signs on local roads each have their own meaning. Spending time learning these before your CBT will help you feel confident when your instructor asks you to follow road signs during the on-road element of your training.`,
      },
      {
        slug: "right-of-way-junctions",
        title: "Right of Way & Junctions",
        estimatedMinutes: 6,
        content: `At any junction, right of way rules determine who should proceed first. In the UK, traffic on a major road has priority over traffic joining from a minor road. A give way line (two dashed lines) means you must be prepared to stop and give priority to traffic on the road you're joining.

T-junctions are the most common type you'll encounter. When emerging from a T-junction, you must give way to all traffic on the major road — both from the left and right. Even if the road appears clear, approach slowly enough that you can stop safely. A stop sign (octagonal, red) requires you to stop completely, even if nothing is coming.

At crossroads without road markings, the general rule is to give way to traffic on your right. However, marked crossroads follow the signs and markings on the road. Always position your bike correctly — just left of the centre line when turning right — to make your intentions clear and protect yourself from oncoming traffic.`,
      },
      {
        slug: "roundabouts-lane-discipline",
        title: "Roundabouts & Lane Discipline",
        estimatedMinutes: 5,
        content: `Roundabouts require you to give way to traffic already on the roundabout, approaching from your right. The key is to approach at the right speed, signal correctly, and choose the appropriate lane before you reach the roundabout — not while you're on it.

For the first exit (turning left), stay in the left lane, signal left on approach, and maintain that signal throughout. For exits straight ahead, approach in the left lane unless signs indicate otherwise, signal left after passing the exit before yours. For exits to the right, use the right lane, signal right on approach, and switch to a left signal as you pass the exit before yours.

Lane discipline applies on all roads. Keep left unless overtaking or turning right. On multi-lane roads, don't straddle lanes or weave between them unnecessarily. Good lane discipline makes your riding predictable — which is exactly what other road users (and your CBT examiner) need to see.`,
      },
      {
        slug: "road-markings-signals",
        title: "Road Markings & Signals",
        estimatedMinutes: 4,
        content: `White lines are the most common road markings you'll encounter. A broken white centre line simply divides traffic; a solid white line means you must not cross it (unless turning into a premises). Double white lines where the line nearest to you is solid mean you must not overtake. Yellow lines along the kerb indicate parking restrictions.

Arrows on the road surface guide lane choice, particularly at junctions and roundabouts. A filter arrow at traffic lights means you may proceed in the indicated direction even if the main light is red — but only when the road is clear. Box junctions (yellow criss-cross markings) must not be entered unless your exit is clear, even if you have a green light.

Hand signals from police officers and traffic wardens override all other signals. Learn the standard positions: arm raised — stop; beckoning — proceed; arm extended to the side — stop traffic from that direction. Your CBT instructor will likely ask you about signals, so having these committed to memory will give you confidence on the day.`,
      },
    ],
    quiz: {
      questions: [
        {
          question: "What shape are warning signs in the UK?",
          options: [
            "Circular with a red border",
            "Rectangular",
            "Triangular with a red border",
            "Diamond-shaped",
          ],
          correctIndex: 2,
          explanation: "Warning signs are triangular with a red border. They alert you to hazards ahead such as sharp bends, pedestrian crossings, or slippery roads. Regulatory signs are circular; information signs are rectangular.",
        },
        {
          question: "What does a red circular sign with a number inside it indicate?",
          options: [
            "A recommended speed",
            "A maximum speed limit",
            "A minimum speed limit",
            "A speed camera zone",
          ],
          correctIndex: 1,
          explanation: "A red-bordered circle with a number indicates the maximum speed limit. You must not exceed this speed. A blue circle with a number inside indicates a minimum speed limit.",
        },
        {
          question: "What does a solid white centre line along the middle of the road mean?",
          options: [
            "You may overtake if it is safe to do so",
            "No parking on either side of the road",
            "You must not cross or straddle the line",
            "The road narrows ahead",
          ],
          correctIndex: 2,
          explanation: "A solid white centre line means you must not cross or straddle it. It appears on bends, hills, or near junctions where overtaking is particularly dangerous.",
        },
        {
          question: "At a roundabout, which vehicles have priority?",
          options: [
            "Vehicles approaching from your left",
            "The largest vehicle at the roundabout",
            "Traffic already on the roundabout, coming from your right",
            "The first vehicle to reach the roundabout",
          ],
          correctIndex: 2,
          explanation: "At roundabouts you must give way to traffic already on the roundabout, which comes from your right. Always check for motorcycles and cyclists who can be difficult to spot.",
        },
        {
          question: "What do double yellow lines painted along the kerb indicate?",
          options: [
            "No stopping at any time",
            "No parking at any time",
            "No parking during certain hours",
            "Permit holders only",
          ],
          correctIndex: 1,
          explanation: "Double yellow lines mean no parking at any time. Single yellow lines indicate parking restrictions during certain hours, which are shown on nearby signs. Double red lines mean no stopping at any time.",
        },
        {
          question: "What is the total stopping distance at 30mph in good conditions?",
          options: [
            "12 metres (40 feet)",
            "23 metres (75 feet)",
            "36 metres (118 feet)",
            "53 metres (175 feet)",
          ],
          correctIndex: 1,
          explanation: "At 30mph the total stopping distance is 23 metres — 9m thinking distance plus 14m braking distance. At 60mph it increases to 73 metres. Always keep a safe following distance.",
        },
        {
          question: "What shape and colour are direction signs on a motorway?",
          options: [
            "Green and rectangular",
            "White and rectangular",
            "Blue and rectangular",
            "Yellow and rectangular",
          ],
          correctIndex: 2,
          explanation: "Motorway signs are blue and rectangular. Primary A-road signs are green, and local direction signs are white. Knowing the colours helps you navigate quickly at speed without reading every word.",
        },
        {
          question: "What does a red circle containing a horizontal white bar mean?",
          options: [
            "No U-turns",
            "No entry",
            "Give way to oncoming traffic",
            "No through road",
          ],
          correctIndex: 1,
          explanation: "A red circle with a horizontal white bar is the no entry sign. You will often see it at one-way streets or restricted access roads. Entering a road displaying this sign is illegal and dangerous.",
        },
        {
          question: "When turning right at a crossroads, where should you position your motorcycle?",
          options: [
            "Stay close to the left kerb",
            "In the centre of your lane",
            "Just left of the centre line",
            "Position does not matter for motorcycles",
          ],
          correctIndex: 2,
          explanation: "When turning right, position just left of the centre line. This makes your intention clear to other road users and protects you from oncoming traffic. Signal clearly and well in advance.",
        },
        {
          question: "What does a yellow criss-cross box junction marked on the road mean?",
          options: [
            "No parking at any time",
            "Give way to traffic from the right",
            "You must not enter unless your exit is clear",
            "Priority for buses and cyclists only",
          ],
          correctIndex: 2,
          explanation: "You must not enter a box junction unless your exit road or lane is clear. The only exception is when turning right — you may wait in the box if held up by oncoming traffic or a vehicle ahead waiting to turn right.",
        },
      ],
    },
  },
  {
    slug: "cbt-day",
    number: 2,
    title: "What to Expect on CBT Day",
    description: "Walk through each stage of your Compulsory Basic Training, step by step.",
    icon: "ClipboardList",
    lessons: [
      {
        slug: "5-elements-of-cbt",
        title: "The 5 Elements of CBT",
        estimatedMinutes: 7,
        content: `CBT (Compulsory Basic Training) is structured into five distinct elements. These aren't tests — they're a training programme designed to ensure you can ride safely on public roads. You must complete all five elements on the same day with the same approved training body (ATB).

Element A is the introduction: your instructor explains what the day involves, checks your eyesight, and makes sure you understand the basics. Element B covers practical on-site training — learning the controls of the bike while it's stationary. Element C is on-site riding, where you practise low-speed manoeuvres in a safe environment. Element D is theory — covering road safety and the rules you need to know. Element E is the on-road riding, where you ride on public roads accompanied by your instructor.

There's no pass or fail grade — your instructor will tell you when they're satisfied you can ride safely. If you're not ready for the on-road element by the end of the day, your training can continue on another day. Most riders complete CBT in a single session of around 5–8 hours.`,
      },
      {
        slug: "theory-eyesight-check",
        title: "The Theory & Eyesight Check",
        estimatedMinutes: 5,
        content: `The eyesight check happens right at the start of your CBT. You'll be asked to read a standard number plate at a distance of 20.5 metres (about 20 car lengths). If you need glasses or contact lenses to do this, you must wear them whenever you ride — this will be noted on your CBT certificate.

The theory element (Element D) usually takes place during a natural break in the day, often after the on-site riding. Your instructor will run through topics including: the dangers of drink and drug driving, the importance of protective clothing, basic road safety rules, and what to do in an emergency. This isn't a formal test — it's a structured discussion to make sure you have the knowledge to keep yourself safe.

You may be asked questions like: what's the stopping distance at 30mph? (23 metres / 75 feet), or what should you do if your throttle sticks open? (pull in the clutch and apply the brakes). Having a basic grounding in the Highway Code before your CBT means you'll feel much more confident during this part of the day.`,
      },
      {
        slug: "on-site-training",
        title: "On-Site Training & Manoeuvres",
        estimatedMinutes: 6,
        content: `Before you ride, your instructor will walk you through the motorcycle's controls — throttle, clutch, front and rear brakes, gear lever, and indicators. You'll learn the friction point on the clutch (the point where the engine engages), which is the key to smooth, slow-speed riding. Take your time here; this knowledge forms the foundation for everything that follows.

The on-site manoeuvres you'll practise include: riding in a straight line and stopping, figure-of-eight circuits, U-turns, slalom (weaving between cones), and emergency stops. All of these are done at low speed in a private area, so there's no traffic to worry about. The goal is to develop bike control and balance, not speed.

The most common sticking point for new riders is the slow-speed balance required for U-turns. The trick is to use a little more throttle than feels comfortable, slip the clutch to control speed, and look where you want to go — not at the ground. Your instructor will give you all the guidance you need; just focus on one thing at a time and don't rush the process.`,
      },
      {
        slug: "on-road-riding",
        title: "On-Road Riding",
        estimatedMinutes: 5,
        content: `Element E is the final — and most exciting — part of CBT. You'll ride on public roads for a minimum of two hours, accompanied by your instructor (usually via radio communication through a helmet earpiece). The route is chosen by the instructor and typically covers a mix of road types: residential streets, A-roads, and sometimes dual carriageways.

You'll be expected to: observe and comply with all traffic signals and signs, position yourself correctly on the road, signal clearly and in good time, check mirrors before manoeuvring, and ride at an appropriate speed for the conditions. Your instructor will give you directions and coaching in real time, so you're never left to figure things out alone.

If at any point you feel unsafe or overwhelmed, your instructor can intervene. The session is designed to build your confidence, not test you under pressure. Most riders finish the on-road element feeling surprised at how natural it felt — especially after the groundwork laid by the on-site training. Once your instructor is satisfied, they'll issue your DL196 certificate: your CBT completion card.`,
      },
    ],
    quiz: {
      questions: [
        {
          question: "What does CBT stand for?",
          options: [
            "Competency Based Training",
            "Compulsory Basic Training",
            "Certified Bike Test",
            "Core Bike Training",
          ],
          correctIndex: 1,
          explanation: "CBT stands for Compulsory Basic Training. It is a mandatory training programme for anyone who wants to ride a motorcycle or moped on public roads in the UK on a provisional licence.",
        },
        {
          question: "How many elements does CBT consist of?",
          options: [
            "3 elements",
            "4 elements",
            "5 elements",
            "6 elements",
          ],
          correctIndex: 2,
          explanation: "CBT has 5 elements: A (Introduction and eyesight check), B (Practical on-site training), C (On-site riding), D (Theory and road safety), and E (On-road riding). All must be completed successfully.",
        },
        {
          question: "At what distance must you read a number plate for the CBT eyesight check?",
          options: [
            "15 metres",
            "20 metres",
            "20.5 metres",
            "25 metres",
          ],
          correctIndex: 2,
          explanation: "You must read a standard number plate at 20.5 metres (approximately 20 car lengths). If you need glasses or contact lenses to pass this check, you must always wear them when riding.",
        },
        {
          question: "Which element of CBT covers on-site riding manoeuvres such as U-turns and figure-of-eights?",
          options: [
            "Element B",
            "Element C",
            "Element D",
            "Element E",
          ],
          correctIndex: 1,
          explanation: "Element C is on-site riding, where you practise manoeuvres including figure-of-eights, U-turns, slalom, and emergency stops in a private area away from traffic.",
        },
        {
          question: "What document do you receive after successfully completing CBT?",
          options: [
            "A provisional motorcycle licence upgrade",
            "Form DL196",
            "A full A1 category licence",
            "A theory test exemption certificate",
          ],
          correctIndex: 1,
          explanation: "You receive Form DL196 — the CBT certificate. It allows you to ride a motorcycle up to 125cc displaying L-plates on public roads (except motorways). It is valid for two years.",
        },
        {
          question: "What is the minimum on-road riding time required for Element E of CBT?",
          options: [
            "30 minutes",
            "1 hour",
            "2 hours",
            "3 hours",
          ],
          correctIndex: 2,
          explanation: "Element E requires a minimum of two hours of riding on public roads. Your instructor typically follows on a motorcycle and communicates via a radio earpiece, giving directions and coaching throughout.",
        },
        {
          question: "Can you carry a pillion passenger after completing CBT?",
          options: [
            "Yes, if the passenger also holds a CBT certificate",
            "Yes, after riding for six months",
            "No — carrying passengers requires a full licence",
            "Yes, with no restrictions whatsoever",
          ],
          correctIndex: 2,
          explanation: "After CBT you cannot carry passengers, cannot use motorways, and must display L-plates at all times. Pillion passengers are only permitted once you hold a full motorcycle licence.",
        },
        {
          question: "How long does a typical CBT day last from start to finish?",
          options: [
            "2–3 hours",
            "3–4 hours",
            "5–8 hours",
            "Exactly 8 hours for all students",
          ],
          correctIndex: 2,
          explanation: "CBT typically takes 5–8 hours. The duration depends on how quickly each student progresses. If you are not ready for on-road riding, training can continue on a subsequent day at no extra cost.",
        },
      ],
    },
  },
  {
    slug: "gear-docs",
    number: 3,
    title: "Gear & Documentation",
    description: "Know exactly what to bring and wear on the day — no last-minute surprises.",
    icon: "CheckSquare",
    lessons: [
      {
        slug: "what-to-wear",
        title: "What to Wear",
        estimatedMinutes: 4,
        content: `A helmet is legally required and must meet the British Standard BS 6658:1985 or equivalent (look for the BSI Kitemark). Your training provider will usually supply a helmet if you don't have your own, but check in advance. If you're buying your own, a full-face helmet gives the best protection; a jet (open-face) helmet is also acceptable but leaves your chin exposed.

Gloves are strongly recommended — your hands are one of the first things to hit the ground in a fall. Motorcycle-specific gloves with palm sliders and knuckle protection are ideal. For your jacket, a motorcycle jacket with CE-rated armour at the shoulders and elbows is best, but most training schools will accept a sturdy denim or leather jacket as a minimum. Avoid hoodies, thin waterproofs, or anything that could catch on the bike.

On your feet, wear ankle-covering boots — ideally motorcycle boots, but sturdy leather boots or work boots are usually acceptable. Avoid trainers, which offer no protection. Trousers with CE-rated knee armour are recommended; jeans offer minimal protection in a slide. Your training provider's website will list exactly what they require — check this the week before so you have time to source anything you're missing.`,
      },
      {
        slug: "documents-to-bring",
        title: "Documents You Need to Bring",
        estimatedMinutes: 3,
        content: `The most important document is your provisional driving licence (the photocard version, not a paper licence). Without it, your training cannot legally proceed. Check that the address on your licence matches your current address — if it doesn't, update it via the DVLA before your training date, as riding with an incorrect address is an offence.

If you already hold a full car licence, bring that too — it can affect what you're permitted to ride after CBT. Some training providers also ask for proof of third-party insurance if you're bringing your own motorcycle, so check with your provider in advance. If you're using the school's bike (which most learners do), you'll be covered under their insurance.

It's worth taking a photo of your licence on your phone as a backup, but your provider will need to see the physical card. Double-check the validity date — provisional licences must be renewed every 10 years. If your licence is close to expiry or you've recently applied and it hasn't arrived, contact the DVLA as soon as possible to avoid having to rearrange your training.`,
      },
      {
        slug: "pre-training-checklist",
        title: "Pre-Training Checklist",
        estimatedMinutes: 4,
        content: `The evening before your CBT, spend 15 minutes going through everything you need. Lay out your gear: helmet (or confirm the school is providing one), gloves, jacket with armour, sturdy boots, and riding trousers or jeans. Check the weather forecast and pack a waterproof layer — you'll be outside all day, and wet conditions won't cancel your training.

Get your documents ready: provisional licence (physical photocard), and anything else your training provider has requested. Set an alarm that gives you enough time to eat a proper breakfast — you'll be concentrating hard all day and energy levels matter. Check your journey to the training centre; being late causes stress before you've even started.

On the morning, eat well and stay hydrated. Avoid alcohol the night before (obviously) and get a good night's sleep. If you wear glasses or contact lenses, make sure you have them with you. Bring a packed lunch if the school doesn't provide one — most training days are 6–8 hours with only short breaks. Leave your phone in a bag during riding; you'll need your full attention on the road.`,
      },
    ],
    quiz: {
      questions: [
        {
          question: "Which standard must a motorcycle helmet meet to be legal in the UK?",
          options: [
            "Only the latest ECE 22.06 standard",
            "Any helmet displaying a CE mark",
            "BS 6658:1985, ECE 22.06, or an equivalent approved standard",
            "Only full-face helmets are legal in the UK",
          ],
          correctIndex: 2,
          explanation: "Your helmet must meet BS 6658:1985, ECE 22.06, or NTA 8776. Look for the BSI Kitemark or UNECE mark. Open-face and full-face helmets are both legal provided they meet the required standard.",
        },
        {
          question: "What is the minimum acceptable footwear for motorcycle CBT?",
          options: [
            "Any closed-toe shoe",
            "Ankle-covering sturdy boots or shoes",
            "Trainers with thick socks",
            "Any footwear the training school approves",
          ],
          correctIndex: 1,
          explanation: "Your ankles must be covered. Motorcycle-specific boots offer the best protection, but sturdy leather work boots are generally accepted. Trainers and regular shoes provide no ankle protection whatsoever in a fall.",
        },
        {
          question: "Which document is essential — without it your CBT cannot legally go ahead?",
          options: [
            "Proof of insurance",
            "Your photocard provisional driving licence",
            "A letter from a GP confirming fitness to ride",
            "Proof of your current home address",
          ],
          correctIndex: 1,
          explanation: "Your physical provisional licence photocard is required by law. Without it the training provider cannot legally verify you are permitted to ride. Check the expiry date and that the address is current before your training day.",
        },
        {
          question: "How long is a CBT certificate (DL196) valid for?",
          options: [
            "1 year",
            "2 years",
            "3 years",
            "Until you pass your full motorcycle test",
          ],
          correctIndex: 1,
          explanation: "A CBT certificate is valid for exactly two years. If it expires before you obtain a full licence, you must complete CBT again before you can legally continue riding on public roads.",
        },
        {
          question: "Are learner riders permitted to use motorways after completing CBT?",
          options: [
            "Yes, as long as L-plates are displayed",
            "Yes, after six months of riding experience",
            "No — motorways are not permitted on a provisional licence",
            "Yes, if accompanied by a qualified motorcyclist",
          ],
          correctIndex: 2,
          explanation: "Learner riders on provisional licences cannot use motorways. Motorway riding is only permitted once you hold a full licence. Other CBT restrictions include no passengers and mandatory L-plate display on all other roads.",
        },
        {
          question: "What is the minimum recommended CE armour level for a motorcycle jacket worn for CBT?",
          options: [
            "CE Level 1 armour at shoulders and elbows",
            "CE Level 2 at every joint",
            "Any motorcycle-branded jacket is sufficient",
            "CE armour is optional if the jacket is genuine leather",
          ],
          correctIndex: 0,
          explanation: "CE Level 1 armour at the shoulders and elbows is the minimum recommendation. CE Level 2 offers greater impact absorption. Back protectors are also strongly advisable, even if not always mandatory for CBT.",
        },
      ],
    },
  },
  {
    slug: "confidence",
    number: 4,
    title: "Confidence Builder",
    description: "Practical tips from experienced riders to help you arrive calm and prepared.",
    icon: "Star",
    lessons: [
      {
        slug: "common-cbt-mistakes",
        title: "Common CBT Mistakes & How to Avoid Them",
        estimatedMinutes: 7,
        content: `The most common mistake new riders make is looking down at the front wheel. Where you look is where you go — this is called the "target fixation" effect. During the on-site manoeuvres, actively practice looking ahead to where you want to end up, not at the ground immediately in front of you. It feels unnatural at first but becomes instinctive quickly.

Gripping the bars too tightly is another widespread issue. Tense arms absorb no vibration and give you less steering control. Think of it like holding a bird — firm enough that it can't escape, but not so tight you hurt it. Loose shoulders and relaxed elbows allow the bike to move naturally under you, especially over bumps. If you find yourself going rigid when you're concentrating, consciously drop your shoulders and take a breath.

Rushing through the friction point is the main cause of stalls. Many beginners release the clutch too quickly, killing the engine before the bike has momentum. Practice finding the biting point and holding it there — feathering the clutch to maintain a slow, controlled speed. This skill takes the most time to develop, so don't worry if it doesn't click immediately. Your instructor has seen every variation of this mistake and knows exactly how to help you work through it.`,
      },
      {
        slug: "tips-from-riders",
        title: "Tips from Experienced Riders",
        estimatedMinutes: 5,
        content: `Every experienced rider remembers feeling nervous before their CBT — and almost all of them say the same thing: it was nowhere near as intimidating as they expected. The on-site training is genuinely low-pressure. You're in a private area with an instructor who's seen it all before. There's no traffic, no judgment, just learning.

One piece of advice that comes up repeatedly: trust your body. When you start to wobble, the instinct is to freeze. Instead, open the throttle slightly and look where you want to go. The bike will follow. Speed actually gives you stability at low speeds — it sounds counterintuitive, but a slow wobble almost always improves when you add a small amount of throttle.

Finally: ask questions. Your CBT instructor's job is to teach, not to judge. If you don't understand something — how to find the friction point, which brake to use first, what a particular road sign means — just ask. The riders who get the most out of their CBT are the ones who engage with the process rather than just trying to get through it. You're investing in a skill you'll use for years; it's worth getting right from the start.`,
      },
      {
        slug: "what-happens-after-cbt",
        title: "What Happens After CBT",
        estimatedMinutes: 4,
        content: `Your CBT certificate (form DL196) is valid for two years. During this time you can ride any motorcycle up to 125cc on public roads, as long as you display L-plates, don't carry passengers, and don't use motorways. If your certificate expires before you've passed your full test, you'll need to do CBT again.

To get a full motorcycle licence, you need to pass both the theory test and the practical test. If you're over 24 (or 21 with 2 years riding experience), you can take the A licence test directly, which allows you to ride any motorcycle of any power. If you're younger, you'll go through the progressive access route: A1 licence at 17 (up to 125cc, 11kW), A2 licence at 19 (up to 35kW), and full A licence at 21.

Many riders choose to book their theory test shortly after CBT while the knowledge is fresh — it's a multiple-choice test plus a hazard perception video test, and both can be studied for with free online resources. The practical test is split into Module 1 (off-road manoeuvres) and Module 2 (on-road riding with an examiner following on a motorbike). RideTo offers full licence courses when you're ready to take that next step.`,
      },
    ],
    quiz: {
      questions: [
        {
          question: "What is 'target fixation' and why does it matter for CBT?",
          options: [
            "The tendency to ride faster than you intend",
            "The tendency to steer towards whatever you are looking at",
            "Focusing too much on the bike's instruments while riding",
            "Braking too hard when approaching a hazard",
          ],
          correctIndex: 1,
          explanation: "Target fixation is the instinct to steer towards what you are looking at. During on-site manoeuvres, looking at cones means you are likely to ride into them. Always look to where you want to go, not at what you want to avoid.",
        },
        {
          question: "If your motorcycle wobbles at slow speed during CBT, what is the best response?",
          options: [
            "Apply both brakes immediately to regain control",
            "Put both feet down straight away",
            "Slightly increase throttle and look ahead",
            "Lean heavily to the opposite side to correct",
          ],
          correctIndex: 2,
          explanation: "A small increase in throttle and looking ahead creates gyroscopic stability that calms a slow-speed wobble. Counter-intuitively, a little more speed helps. Braking or tensing up makes a wobble significantly worse.",
        },
        {
          question: "What is the 'friction point' (biting point) on a motorcycle clutch?",
          options: [
            "The point where the rear brake fully engages",
            "The point where the clutch begins transferring power to the rear wheel",
            "The maximum lean angle before losing tyre grip",
            "The point where the throttle becomes fully responsive",
          ],
          correctIndex: 1,
          explanation: "The friction point is where the clutch plates begin to engage and drive transfers to the wheel. Mastering slow feathering of the clutch at this point is the most important skill for low-speed control and is heavily practised during CBT.",
        },
        {
          question: "What is the most common reason learner riders stall the engine during CBT?",
          options: [
            "Selecting the wrong gear for the speed",
            "Releasing the clutch too quickly",
            "Applying too much throttle before moving",
            "Forgetting to turn the ignition on fully",
          ],
          correctIndex: 1,
          explanation: "Releasing the clutch too quickly before sufficient engine revs have built is the most common cause of stalls. The fix: find the friction point first, hold it, open the throttle slightly, then release the clutch slowly and progressively.",
        },
        {
          question: "After passing CBT, what is the correct first step towards obtaining a full motorcycle licence?",
          options: [
            "Book Module 1 (the off-road manoeuvres practical test)",
            "Apply to the DVLA to upgrade your provisional licence",
            "Pass the motorcycle theory test",
            "Complete an advanced riding course",
          ],
          correctIndex: 2,
          explanation: "You must pass the motorcycle theory test (multiple choice and hazard perception) before booking any practical tests. Module 1 (off-road) and Module 2 (on-road with examiner) are booked after your theory pass certificate is issued.",
        },
      ],
    },
  },
];

export const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
