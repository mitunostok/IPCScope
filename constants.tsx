
import { Department } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'hospital-kitchen',
    name: 'Hospital Kitchen',
    description: 'Food safety, staff hygiene, and clinical nutrition infection prevention',
    sections: [
      {
        id: 'hk-1',
        title: '1. Personal Hygiene & Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'hk-1-1', text: 'Hand wash stations available' },
          { id: 'hk-1-2', text: 'Soap & paper towels available' },
          { id: 'hk-1-3', text: 'Hand washing before food handling' },
          { id: 'hk-1-4', text: 'No jewelry, long nails, or open wounds' },
          { id: 'hk-1-5', text: 'IPC posters displayed' }
        ]
      },
      {
        id: 'hk-2',
        title: '2. PPE & Staff Health',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'hk-2-1', text: 'Hair caps worn' },
          { id: 'hk-2-2', text: 'Aprons worn' },
          { id: 'hk-2-3', text: 'Gloves used when needed' },
          { id: 'hk-2-4', text: 'Staff free from illness' },
          { id: 'hk-2-5', text: 'Medical check-up records available' }
        ]
      },
      {
        id: 'hk-3',
        title: '3. Food Handling & Preparation',
        icon: 'Soup',
        maxScore: 10,
        questions: [
          { id: 'hk-3-1', text: 'Raw and cooked food separated' },
          { id: 'hk-3-2', text: 'Vegetables washed properly' },
          { id: 'hk-3-3', text: 'Food cooked thoroughly' },
          { id: 'hk-3-4', text: 'Food covered during preparation' },
          { id: 'hk-3-5', text: 'No expired food used' }
        ]
      },
      {
        id: 'hk-4',
        title: '4. Equipment, Utensils & Surfaces',
        icon: 'Utensils',
        maxScore: 10,
        questions: [
          { id: 'hk-4-1', text: 'Cutting boards cleaned' },
          { id: 'hk-4-2', text: 'Knives and utensils clean' },
          { id: 'hk-4-3', text: 'Cooking surfaces disinfected' },
          { id: 'hk-4-4', text: 'Dishwashers functioning' },
          { id: 'hk-4-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'hk-5',
        title: '5. Storage & Refrigeration',
        icon: 'Thermometer',
        maxScore: 10,
        questions: [
          { id: 'hk-5-1', text: 'Refrigerator temperature monitored' },
          { id: 'hk-5-2', text: 'Raw & cooked foods stored separately' },
          { id: 'hk-5-3', text: 'Food properly labeled and dated' },
          { id: 'hk-5-4', text: 'No over-crowding' },
          { id: 'hk-5-5', text: 'No spoiled food' }
        ]
      },
      {
        id: 'hk-6',
        title: '6. Waste, Pest Control & Cleanliness',
        icon: 'Bug',
        maxScore: 10,
        questions: [
          { id: 'hk-6-1', text: 'Waste bins covered' },
          { id: 'hk-6-2', text: 'Waste removed regularly' },
          { id: 'hk-6-3', text: 'No flies or rodents' },
          { id: 'hk-6-4', text: 'Floors clean and dry' },
          { id: 'hk-6-5', text: 'Pest control records available' }
        ]
      },
      {
        id: 'hk-7',
        title: '7. Food Distribution & Transport',
        icon: 'Truck',
        maxScore: 10,
        questions: [
          { id: 'hk-7-1', text: 'Food transported in covered containers' },
          { id: 'hk-7-2', text: 'Trolleys clean' },
          { id: 'hk-7-3', text: 'No cross-contamination' },
          { id: 'hk-7-4', text: 'Food served hot/cold as required' },
          { id: 'hk-7-5', text: 'Leftovers handled safely' }
        ]
      }
    ]
  },
  {
    id: 'laboratory',
    name: 'Laboratory',
    description: 'High risk of exposure to blood, body fluids, and infectious specimens',
    sections: [
      {
        id: 'lb-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'lb-1-1', text: 'Hand wash & hand rub available' },
          { id: 'lb-1-2', text: 'Hand hygiene before and after work' },
          { id: 'lb-1-3', text: 'After handling specimens' },
          { id: 'lb-1-4', text: 'After removing gloves' },
          { id: 'lb-1-5', text: 'IPC posters displayed' }
        ]
      },
      {
        id: 'lb-2',
        title: '2. PPE & Personal Safety',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'lb-2-1', text: 'Gloves available' },
          { id: 'lb-2-2', text: 'Lab coats/gowns available' },
          { id: 'lb-2-3', text: 'Masks/face shields available' },
          { id: 'lb-2-4', text: 'Correct PPE used' },
          { id: 'lb-2-5', text: 'No eating/drinking in lab' }
        ]
      },
      {
        id: 'lb-3',
        title: '3. Specimen Handling & Transport',
        icon: 'FlaskConical',
        maxScore: 10,
        questions: [
          { id: 'lb-3-1', text: 'Specimens labeled correctly' },
          { id: 'lb-3-2', text: 'Leak-proof containers used' },
          { id: 'lb-3-3', text: 'Biohazard bags used' },
          { id: 'lb-3-4', text: 'No spills during transport' },
          { id: 'lb-3-5', text: 'Specimen rejection criteria followed' }
        ]
      },
      {
        id: 'lb-4',
        title: '4. Biosafety & Work Practices',
        icon: 'Biohazard',
        maxScore: 10,
        questions: [
          { id: 'lb-4-1', text: 'Biosafety cabinet used when required' },
          { id: 'lb-4-2', text: 'No mouth pipetting' },
          { id: 'lb-4-3', text: 'Aerosol-generating work inside BSC' },
          { id: 'lb-4-4', text: 'Decontamination after work' },
          { id: 'lb-4-5', text: 'SOPs available' }
        ]
      },
      {
        id: 'lb-5',
        title: '5. Equipment & Work Area',
        icon: 'Microscope',
        maxScore: 10,
        questions: [
          { id: 'lb-5-1', text: 'Work benches clean' },
          { id: 'lb-5-2', text: 'Centrifuges clean' },
          { id: 'lb-5-3', text: 'Microscopes & analyzers wiped' },
          { id: 'lb-5-4', text: 'No clutter' },
          { id: 'lb-5-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'lb-6',
        title: '6. Waste, Sharps & Spills',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'lb-6-1', text: 'Correct waste segregation' },
          { id: 'lb-6-2', text: 'Sharps disposed in puncture-proof box' },
          { id: 'lb-6-3', text: 'Spill kit available' },
          { id: 'lb-6-4', text: 'Spills cleaned immediately' },
          { id: 'lb-6-5', text: 'Waste removed regularly' }
        ]
      },
      {
        id: 'lb-7',
        title: '7. Staff Health, Training & Records',
        icon: 'BookOpen',
        maxScore: 10,
        questions: [
          { id: 'lb-7-1', text: 'Staff immunized (HBV etc.)' },
          { id: 'lb-7-2', text: 'Training records available' },
          { id: 'lb-7-3', text: 'Exposure reporting system in place' },
          { id: 'lb-7-4', text: 'Incident log maintained' },
          { id: 'lb-7-5', text: 'Safety signage displayed' }
        ]
      }
    ]
  },
  {
    id: 'operation-theatre',
    name: 'Operation Theatre (OT)',
    description: 'Prevention of surgical site infections and cross-contamination',
    sections: [
      {
        id: 'ot-1',
        title: '1. OT Environment & Layout',
        icon: 'Wind',
        maxScore: 10,
        questions: [
          { id: 'ot-1-1', text: 'Unidirectional traffic flow maintained' },
          { id: 'ot-1-2', text: 'Restricted entry to OT' },
          { id: 'ot-1-3', text: 'Doors kept closed' },
          { id: 'ot-1-4', text: 'Positive pressure ventilation active' },
          { id: 'ot-1-5', text: 'Temperature & humidity monitored' }
        ]
      },
      {
        id: 'ot-2',
        title: '2. Hand Hygiene & Surgical Scrub',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'ot-2-1', text: 'Hand scrub area clean' },
          { id: 'ot-2-2', text: 'Surgical hand scrub done properly' },
          { id: 'ot-2-3', text: 'Alcohol-based hand rub used' },
          { id: 'ot-2-4', text: 'No jewelry or artificial nails' },
          { id: 'ot-2-5', text: 'Posters displayed' }
        ]
      },
      {
        id: 'ot-3',
        title: '3. PPE & Theatre Attire',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'ot-3-1', text: 'OT dress, caps, masks worn' },
          { id: 'ot-3-2', text: 'Sterile gowns & gloves used' },
          { id: 'ot-3-3', text: 'Footwear dedicated for OT' },
          { id: 'ot-3-4', text: 'No outside clothes inside OT' },
          { id: 'ot-3-5', text: 'Correct doffing practiced' }
        ]
      },
      {
        id: 'ot-4',
        title: '4. Sterilization & Instruments',
        icon: 'Activity',
        maxScore: 10,
        questions: [
          { id: 'ot-4-1', text: 'Sterile packs intact' },
          { id: 'ot-4-2', text: 'Sterilization indicators checked' },
          { id: 'ot-4-3', text: 'Instruments stored correctly' },
          { id: 'ot-4-4', text: 'No expired sterile packs' },
          { id: 'ot-4-5', text: 'CSSD records available' }
        ]
      },
      {
        id: 'ot-5',
        title: '5. Aseptic Technique During Surgery',
        icon: 'UserCheck',
        maxScore: 10,
        questions: [
          { id: 'ot-5-1', text: 'Proper patient skin preparation' },
          { id: 'ot-5-2', text: 'Sterile draping maintained' },
          { id: 'ot-5-3', text: 'Minimal OT traffic' },
          { id: 'ot-5-4', text: 'No unnecessary talking' },
          { id: 'ot-5-5', text: 'Implants handled aseptically' }
        ]
      },
      {
        id: 'ot-6',
        title: '6. OT Cleaning & Disinfection',
        icon: 'Sparkles',
        maxScore: 10,
        questions: [
          { id: 'ot-6-1', text: 'OT cleaned between cases' },
          { id: 'ot-6-2', text: 'Spill management done' },
          { id: 'ot-6-3', text: 'Correct disinfectants used' },
          { id: 'ot-6-4', text: 'End-of-day terminal cleaning' },
          { id: 'ot-6-5', text: 'Cleaning records available' }
        ]
      },
      {
        id: 'ot-7',
        title: '7. Waste, Linen & Zoning',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'ot-7-1', text: 'Biomedical waste segregated' },
          { id: 'ot-7-2', text: 'Sharps disposed safely' },
          { id: 'ot-7-3', text: 'Soiled linen sent in closed bags' },
          { id: 'ot-7-4', text: 'Clean-dirty separation maintained' },
          { id: 'ot-7-5', text: 'Waste removed promptly' }
        ]
      }
    ]
  },
  {
    id: 'palliative-care',
    name: 'Palliative Care Unit',
    description: 'Comfort-focused care with high infection risk',
    sections: [
      {
        id: 'pc-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'pc-1-1', text: 'Hand rub available at bedside' },
          { id: 'pc-1-2', text: 'Hand hygiene before care contact' },
          { id: 'pc-1-3', text: 'After touching surroundings' },
          { id: 'pc-1-4', text: 'Posters displayed clearly' },
          { id: 'pc-1-5', text: 'Soap and water available for staff' }
        ]
      },
      {
        id: 'pc-2',
        title: '2. PPE Use',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'pc-2-1', text: 'Gloves available and used' },
          { id: 'pc-2-2', text: 'Masks used when indicated' },
          { id: 'pc-2-3', text: 'Aprons available for wet work' },
          { id: 'pc-2-4', text: 'No multi-use PPE observed' },
          { id: 'pc-2-5', text: 'Correct disposal of used PPE' }
        ]
      },
      {
        id: 'pc-3',
        title: '3. Wound, Pressure Sore & Catheter Care',
        icon: 'HeartPulse',
        maxScore: 10,
        questions: [
          { id: 'pc-3-1', text: 'Wounds clean and covered' },
          { id: 'pc-3-2', text: 'Pressure sore dressings intact' },
          { id: 'pc-3-3', text: 'Urinary catheter care done' },
          { id: 'pc-3-4', text: 'Urine bag off floor' },
          { id: 'pc-3-5', text: 'No unnecessary catheters' }
        ]
      },
      {
        id: 'pc-4',
        title: '4. Patient Hygiene & Body Fluids',
        icon: 'Bath',
        maxScore: 10,
        questions: [
          { id: 'pc-4-1', text: 'Regular bed bath provided' },
          { id: 'pc-4-2', text: 'Oral care done' },
          { id: 'pc-4-3', text: 'Incontinence care done' },
          { id: 'pc-4-4', text: 'Spills cleaned immediately' },
          { id: 'pc-4-5', text: 'Soiled diapers disposed safely' }
        ]
      },
      {
        id: 'pc-5',
        title: '5. Environment & Equipment',
        icon: 'Home',
        maxScore: 10,
        questions: [
          { id: 'pc-5-1', text: 'Bed rails and tables clean' },
          { id: 'pc-5-2', text: 'Patient equipment disinfected' },
          { id: 'pc-5-3', text: 'Floors clean and dry' },
          { id: 'pc-5-4', text: 'No clutter' },
          { id: 'pc-5-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'pc-6',
        title: '6. Waste & Linen Management',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'pc-6-1', text: 'Correct waste segregation' },
          { id: 'pc-6-2', text: 'Sharps disposed safely' },
          { id: 'pc-6-3', text: 'Soiled linen bagged correctly' },
          { id: 'pc-6-4', text: 'Bins not overfilled' },
          { id: 'pc-6-5', text: 'Waste removed daily' }
        ]
      },
      {
        id: 'pc-7',
        title: '7. Visitors, Family & Patient Safety',
        icon: 'Users',
        maxScore: 10,
        questions: [
          { id: 'pc-7-1', text: 'Visitors educated on hand hygiene' },
          { id: 'pc-7-2', text: 'Visitors wearing masks if required' },
          { id: 'pc-7-3', text: 'No sick visitors allowed' },
          { id: 'pc-7-4', text: 'Bedside crowding controlled' },
          { id: 'pc-7-5', text: 'IPC posters displayed' }
        ]
      }
    ]
  },
  {
    id: 'ped-oncology',
    name: 'Pediatric Hemato-Oncology Unit',
    description: 'High-risk children with cancer, leukemia, bone-marrow suppression',
    sections: [
      {
        id: 'po-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'po-1-1', text: 'Hand rub available at each bed' },
          { id: 'po-1-2', text: 'Staff clean hands before touching child' },
          { id: 'po-1-3', text: 'Hand hygiene after body fluid exposure' },
          { id: 'po-1-4', text: 'After touching bed / toys / monitors' },
          { id: 'po-1-5', text: 'Hand hygiene posters displayed' }
        ]
      },
      {
        id: 'po-2',
        title: '2. PPE Use',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'po-2-1', text: 'Gloves available' },
          { id: 'po-2-2', text: 'Masks available' },
          { id: 'po-2-3', text: 'Gowns available' },
          { id: 'po-2-4', text: 'Correct PPE used for patient care' },
          { id: 'po-2-5', text: 'PPE removed before leaving bedside' }
        ]
      },
      {
        id: 'po-3',
        title: '3. Neutropenic & Protective Isolation',
        icon: 'Lock',
        maxScore: 10,
        questions: [
          { id: 'po-3-1', text: 'Neutropenic children in single rooms' },
          { id: 'po-3-2', text: 'Isolation signage displayed' },
          { id: 'po-3-3', text: 'Visitors screened and masked' },
          { id: 'po-3-4', text: 'No flowers / plants / outside food' },
          { id: 'po-3-5', text: 'Dedicated equipment used' }
        ]
      },
      {
        id: 'po-4',
        title: '4. Central Lines, IV & Blood Products',
        icon: 'Syringe',
        maxScore: 10,
        questions: [
          { id: 'po-4-1', text: 'Central line dressing clean and intact' },
          { id: 'po-4-2', text: 'Line access using aseptic technique' },
          { id: 'po-4-3', text: 'IV lines dated and labeled' },
          { id: 'po-4-4', text: 'No unnecessary lines' },
          { id: 'po-4-5', text: 'Blood transfusion sets changed correctly' }
        ]
      },
      {
        id: 'po-5',
        title: '5. Environment, Toys & Equipment',
        icon: 'Baby',
        maxScore: 10,
        questions: [
          { id: 'po-5-1', text: 'Bed rails, tables clean' },
          { id: 'po-5-2', text: 'Shared toys cleaned daily' },
          { id: 'po-5-3', text: 'Monitors and pumps disinfected' },
          { id: 'po-5-4', text: 'No clutter' },
          { id: 'po-5-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'po-6',
        title: '6. Waste, Linen & Diapers',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'po-6-1', text: 'Correct waste segregation' },
          { id: 'po-6-2', text: 'Sharps disposed safely' },
          { id: 'po-6-3', text: 'Soiled diapers in closed bins' },
          { id: 'po-6-4', text: 'Soiled linen bagged correctly' },
          { id: 'po-6-5', text: 'Waste removed daily' }
        ]
      },
      {
        id: 'po-7',
        title: '7. Staff, Parents & Visitors',
        icon: 'Users',
        maxScore: 10,
        questions: [
          { id: 'po-7-1', text: 'Parents educated on hand hygiene' },
          { id: 'po-7-2', text: 'Visitors restricted' },
          { id: 'po-7-3', text: 'No sick visitors' },
          { id: 'po-7-4', text: 'Masks worn' },
          { id: 'po-7-5', text: 'Education posters displayed' }
        ]
      }
    ]
  },
  {
    id: 'radiation-oncology',
    name: 'Radiation Oncology Unit',
    description: 'High-risk patients receiving radiotherapy & chemotherapy',
    sections: [
      {
        id: 'ro-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'ro-1-1', text: 'Hand rub available in treatment area' },
          { id: 'ro-1-2', text: 'Hand hygiene before positioning patient' },
          { id: 'ro-1-3', text: 'After touching immobilization devices' },
          { id: 'ro-1-4', text: 'After touching surroundings' },
          { id: 'ro-1-5', text: 'Posters displayed' }
        ]
      },
      {
        id: 'ro-2',
        title: '2. PPE & Staff Safety',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'ro-2-1', text: 'Gloves available for patient care' },
          { id: 'ro-2-2', text: 'Masks available for staff' },
          { id: 'ro-2-3', text: 'Aprons for cleaning procedures' },
          { id: 'ro-2-4', text: 'Correct PPE used consistently' },
          { id: 'ro-2-5', text: 'Radiation safety protocols followed' }
        ]
      },
      {
        id: 'ro-3',
        title: '3. Patient Screening & Flow',
        icon: 'Users',
        maxScore: 10,
        questions: [
          { id: 'ro-3-1', text: 'Febrile/infectious patients identified' },
          { id: 'ro-3-2', text: 'Respiratory patients masked' },
          { id: 'ro-3-3', text: 'Neutropenic patients prioritized' },
          { id: 'ro-3-4', text: 'Overcrowding avoided' },
          { id: 'ro-3-5', text: 'Signage displayed' }
        ]
      },
      {
        id: 'ro-4',
        title: '4. Treatment Room & Equipment',
        icon: 'Radiation',
        maxScore: 10,
        questions: [
          { id: 'ro-4-1', text: 'Treatment couches cleaned between patients' },
          { id: 'ro-4-2', text: 'Immobilization devices disinfected' },
          { id: 'ro-4-3', text: 'Control panels & touch screens cleaned' },
          { id: 'ro-4-4', text: 'No unnecessary items in room' },
          { id: 'ro-4-5', text: 'Cleaning log maintained' }
        ]
      },
      {
        id: 'ro-5',
        title: '5. Skin, Wound & Catheter Care',
        icon: 'HeartPulse',
        maxScore: 10,
        questions: [
          { id: 'ro-5-1', text: 'Radiation skin reactions clean & protected' },
          { id: 'ro-5-2', text: 'Dressings dry and intact' },
          { id: 'ro-5-3', text: 'Aseptic technique used' },
          { id: 'ro-5-4', text: 'Central line / IV site clean' },
          { id: 'ro-5-5', text: 'No unnecessary devices' }
        ]
      },
      {
        id: 'ro-6',
        title: '6. Environment & Waiting Area',
        icon: 'Home',
        maxScore: 10,
        questions: [
          { id: 'ro-6-1', text: 'Waiting chairs clean' },
          { id: 'ro-6-2', text: 'Floors clean and dry' },
          { id: 'ro-6-3', text: 'Toilets clean' },
          { id: 'ro-6-4', text: 'No clutter' },
          { id: 'ro-6-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'ro-7',
        title: '7. Waste, Linen & Visitors',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'ro-7-1', text: 'Correct waste segregation' },
          { id: 'ro-7-2', text: 'Sharps disposed safely' },
          { id: 'ro-7-3', text: 'Soiled linen bagged correctly' },
          { id: 'ro-7-4', text: 'Visitors controlled' },
          { id: 'ro-7-5', text: 'Masks available for visitors' }
        ]
      }
    ]
  },
  {
    id: 'surgical-oncology',
    name: 'Surgical Oncology Unit',
    description: 'High-risk surgical patients, drains, catheters, and wounds',
    sections: [
      {
        id: 'so-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'so-1-1', text: 'Hand rub at each bed/cubicle' },
          { id: 'so-1-2', text: 'Hand hygiene before wound care' },
          { id: 'so-1-3', text: 'After drain handling' },
          { id: 'so-1-4', text: 'After touching patient' },
          { id: 'so-1-5', text: 'Posters displayed' }
        ]
      },
      {
        id: 'so-2',
        title: '2. Personal Protective Equipment',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'so-2-1', text: 'Gloves available for sterile work' },
          { id: 'so-2-2', text: 'Masks used for dressings' },
          { id: 'so-2-3', text: 'Aprons used for body fluid risk' },
          { id: 'so-2-4', text: 'Correct doffing sequence followed' },
          { id: 'so-2-5', text: 'No multi-use PPE' }
        ]
      },
      {
        id: 'so-3',
        title: '3. Surgical Wound & Drain Care',
        icon: 'Activity',
        maxScore: 10,
        questions: [
          { id: 'so-3-1', text: 'Wounds clean and covered' },
          { id: 'so-3-2', text: 'No soakage of dressings' },
          { id: 'so-3-3', text: 'Aseptic technique used' },
          { id: 'so-3-4', text: 'Drain sites clean' },
          { id: 'so-3-5', text: 'Drain bags below wound level' }
        ]
      },
      {
        id: 'so-4',
        title: '4. Invasive Devices',
        icon: 'Stethoscope',
        maxScore: 10,
        questions: [
          { id: 'so-4-1', text: 'IV site clean' },
          { id: 'so-4-2', text: 'Central line dressing intact' },
          { id: 'so-4-3', text: 'Catheter care done' },
          { id: 'so-4-4', text: 'Urine bags off the floor' },
          { id: 'so-4-5', text: 'Devices labeled with date' }
        ]
      },
      {
        id: 'so-5',
        title: '5. Environment & Equipment',
        icon: 'Home',
        maxScore: 10,
        questions: [
          { id: 'so-5-1', text: 'Bed rails and tables clean' },
          { id: 'so-5-2', text: 'Equipment disinfected between patients' },
          { id: 'so-5-3', text: 'Floors clean and dry' },
          { id: 'so-5-4', text: 'No clutter' },
          { id: 'so-5-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'so-6',
        title: '6. Waste & Linen Management',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'so-6-1', text: 'Correct waste segregation' },
          { id: 'so-6-2', text: 'Sharps disposed safely' },
          { id: 'so-6-3', text: 'Soiled linen bagged correctly' },
          { id: 'so-6-4', text: 'Bins not overfilled' },
          { id: 'so-6-5', text: 'Waste removed regularly' }
        ]
      },
      {
        id: 'so-7',
        title: '7. Patient Isolation & Safety',
        icon: 'Lock',
        maxScore: 10,
        questions: [
          { id: 'so-7-1', text: 'High-risk patients isolated' },
          { id: 'so-7-2', text: 'Isolation signs displayed' },
          { id: 'so-7-3', text: 'Dedicated equipment used' },
          { id: 'so-7-4', text: 'Visitors controlled' },
          { id: 'so-7-5', text: 'Neutropenic precautions followed' }
        ]
      }
    ]
  },
  {
    id: 'day-care',
    name: 'Day Care Unit',
    description: 'High patient turnover, injections, IV therapy, chemotherapy, transfusions',
    sections: [
      {
        id: 'dc-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'dc-1-1', text: 'Hand rub available at each chair/bed' },
          { id: 'dc-1-2', text: 'Hand hygiene before patient contact' },
          { id: 'dc-1-3', text: 'After blood/body fluid exposure' },
          { id: 'dc-1-4', text: 'After touching patient surroundings' },
          { id: 'dc-1-5', text: 'Hand Hygine Posters displayed' }
        ]
      },
      {
        id: 'dc-2',
        title: '2. PPE & Injection Safety',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'dc-2-1', text: 'Gloves available' },
          { id: 'dc-2-2', text: 'Masks available' },
          { id: 'dc-2-3', text: 'Aseptic technique used' },
          { id: 'dc-2-4', text: 'Single-use needles and syringes' },
          { id: 'dc-2-5', text: 'Sharps disposed immediately' }
        ]
      },
      {
        id: 'dc-3',
        title: '3. IV Lines, Chemo & Transfusion',
        icon: 'Syringe',
        maxScore: 10,
        questions: [
          { id: 'dc-3-1', text: 'IV site clean and labeled' },
          { id: 'dc-3-2', text: 'Lines accessed aseptically' },
          { id: 'dc-3-3', text: 'No reuse of IV sets' },
          { id: 'dc-3-4', text: 'Blood/chemo protocols followed' },
          { id: 'dc-3-5', text: 'Spill kit available' }
        ]
      },
      {
        id: 'dc-4',
        title: '4. Patient Placement & Flow',
        icon: 'Users',
        maxScore: 10,
        questions: [
          { id: 'dc-4-1', text: 'Clean chairs/beds between patients' },
          { id: 'dc-4-2', text: 'Infectious patients separated' },
          { id: 'dc-4-3', text: 'No overcrowding' },
          { id: 'dc-4-4', text: 'Respiratory patients masked' },
          { id: 'dc-4-5', text: 'Signage displayed' }
        ]
      },
      {
        id: 'dc-5',
        title: '5. Environment & Equipment',
        icon: 'Stethoscope',
        maxScore: 10,
        questions: [
          { id: 'dc-5-1', text: 'Chairs, beds, tables clean' },
          { id: 'dc-5-2', text: 'BP machines and pumps disinfected' },
          { id: 'dc-5-3', text: 'Floors clean and dry' },
          { id: 'dc-5-4', text: 'No clutter' },
          { id: 'dc-5-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'dc-6',
        title: '6. Waste, Linen & Spills',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'dc-6-1', text: 'Correct waste segregation' },
          { id: 'dc-6-2', text: 'Sharps disposed safely' },
          { id: 'dc-6-3', text: 'Spills cleaned immediately' },
          { id: 'dc-6-4', text: 'Soiled linen bagged correctly' },
          { id: 'dc-6-5', text: 'Waste removed regularly' }
        ]
      },
      {
        id: 'dc-7',
        title: '7. Staff & Patient Practices',
        icon: 'ClipboardCheck',
        maxScore: 10,
        questions: [
          { id: 'dc-7-1', text: 'Staff following IPC practices' },
          { id: 'dc-7-2', text: 'Patients educated on hand hygiene' },
          { id: 'dc-7-3', text: 'Visitors limited' },
          { id: 'dc-7-4', text: 'Masks available' },
          { id: 'dc-7-5', text: 'Posters displayed' }
        ]
      }
    ]
  },
  {
    id: 'emergency',
    name: 'Emergency Department',
    description: 'High patient load, trauma, respiratory & blood exposure risk',
    sections: [
      {
        id: 'ed-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'ed-1-1', text: 'Hand rub at triage and each bed' },
          { id: 'ed-1-2', text: 'Hand hygiene before patient contact' },
          { id: 'ed-1-3', text: 'After blood/body fluid exposure' },
          { id: 'ed-1-4', text: 'After touching patient surroundings' },
          { id: 'ed-1-5', text: 'Hand hygiene posters visible' }
        ]
      },
      {
        id: 'ed-2',
        title: '2. PPE & Staff Safety',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'ed-2-1', text: 'Gloves available' },
          { id: 'ed-2-2', text: 'Masks available' },
          { id: 'ed-2-3', text: 'Face shields / goggles available' },
          { id: 'ed-2-4', text: 'Gowns / aprons available' },
          { id: 'ed-2-5', text: 'Correct PPE used during procedures' }
        ]
      },
      {
        id: 'ed-3',
        title: '3. Triage & Patient Flow',
        icon: 'Users',
        maxScore: 10,
        questions: [
          { id: 'ed-3-1', text: 'Respiratory patients masked' },
          { id: 'ed-3-2', text: 'Suspected infectious cases isolated' },
          { id: 'ed-3-3', text: 'Fast-tracking of febrile patients' },
          { id: 'ed-3-4', text: 'Crowding controlled' },
          { id: 'ed-3-5', text: 'Signage displayed' }
        ]
      },
      {
        id: 'ed-4',
        title: '4. Procedures & Injection Safety',
        icon: 'Syringe',
        maxScore: 10,
        questions: [
          { id: 'ed-4-1', text: 'Aseptic technique used' },
          { id: 'ed-4-2', text: 'Single-use needles & syringes' },
          { id: 'ed-4-3', text: 'No recapping of needles' },
          { id: 'ed-4-4', text: 'Sharps disposed immediately' },
          { id: 'ed-4-5', text: 'IV lines handled aseptically' }
        ]
      },
      {
        id: 'ed-5',
        title: '5. Environment & Equipment',
        icon: 'Stethoscope',
        maxScore: 10,
        questions: [
          { id: 'ed-5-1', text: 'Stretchers, rails, monitors clean' },
          { id: 'ed-5-2', text: 'Procedure trolleys disinfected' },
          { id: 'ed-5-3', text: 'Floors clean and dry' },
          { id: 'ed-5-4', text: 'No clutter' },
          { id: 'ed-5-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'ed-6',
        title: '6. Waste, Linen & Spills',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'ed-6-1', text: 'Correct waste segregation' },
          { id: 'ed-6-2', text: 'Sharps safety' },
          { id: 'ed-6-3', text: 'Blood/body fluid spills cleaned properly' },
          { id: 'ed-6-4', text: 'Soiled linen bagged' },
          { id: 'ed-6-5', text: 'Waste removed regularly' }
        ]
      },
      {
        id: 'ed-7',
        title: '7. Visitors & Public Safety',
        icon: 'Users',
        maxScore: 10,
        questions: [
          { id: 'ed-7-1', text: 'Visitors limited' },
          { id: 'ed-7-2', text: 'Hand hygiene facilities available' },
          { id: 'ed-7-3', text: 'Masks for visitors' },
          { id: 'ed-7-4', text: 'No sick attendants' },
          { id: 'ed-7-5', text: 'Education posters displayed' }
        ]
      }
    ]
  },
  {
    id: 'icu',
    name: 'Intensive Care Unit (ICU)',
    description: 'High-risk area for HAIs: VAP, CLABSI, CAUTI, SSI',
    sections: [
      {
        id: 'icu-1',
        title: '1. Hand Hygiene',
        icon: 'Hand',
        maxScore: 10,
        questions: [
          { id: 'icu-1-1', text: 'Hand rub available at each bed' },
          { id: 'icu-1-2', text: 'Hand hygiene before patient contact' },
          { id: 'icu-1-3', text: 'After body fluid exposure' },
          { id: 'icu-1-4', text: 'After touching patient surroundings' },
          { id: 'icu-1-5', text: 'Hand hygiene posters displayed' }
        ]
      },
      {
        id: 'icu-2',
        title: '2. PPE Use',
        icon: 'ShieldCheck',
        maxScore: 10,
        questions: [
          { id: 'icu-2-1', text: 'Gloves available' },
          { id: 'icu-2-2', text: 'Masks available' },
          { id: 'icu-2-3', text: 'Gowns available' },
          { id: 'icu-2-4', text: 'Correct PPE used for procedures' },
          { id: 'icu-2-5', text: 'PPE removed before leaving patient area' }
        ]
      },
      {
        id: 'icu-3',
        title: '3. Ventilator & Respiratory Care',
        icon: 'Stethoscope',
        maxScore: 10,
        questions: [
          { id: 'icu-3-1', text: 'Head end elevated (30–45°)' },
          { id: 'icu-3-2', text: 'Closed suction system used' },
          { id: 'icu-3-3', text: 'Oral care performed' },
          { id: 'icu-3-4', text: 'Ventilator tubing clean' },
          { id: 'icu-3-5', text: 'Condensate drained correctly' }
        ]
      },
      {
        id: 'icu-4',
        title: '4. Central Line & IV Care',
        icon: 'Syringe',
        maxScore: 10,
        questions: [
          { id: 'icu-4-1', text: 'Central line dressing clean & intact' },
          { id: 'icu-4-2', text: 'Aseptic access used' },
          { id: 'icu-4-3', text: 'Lines dated & labeled' },
          { id: 'icu-4-4', text: 'No unnecessary lines' },
          { id: 'icu-4-5', text: 'Alcohol hub used before access' }
        ]
      },
      {
        id: 'icu-5',
        title: '5. Urinary Catheter Care',
        icon: 'ClipboardCheck',
        maxScore: 10,
        questions: [
          { id: 'icu-5-1', text: 'Catheter indication documented' },
          { id: 'icu-5-2', text: 'Urine bag below bladder level' },
          { id: 'icu-5-3', text: 'Urine bag off floor' },
          { id: 'icu-5-4', text: 'Closed drainage system' },
          { id: 'icu-5-5', text: 'Daily catheter necessity reviewed' }
        ]
      },
      {
        id: 'icu-6',
        title: '6. Environment & Equipment',
        icon: 'Stethoscope',
        maxScore: 10,
        questions: [
          { id: 'icu-6-1', text: 'Bed rails, monitors clean' },
          { id: 'icu-6-2', text: 'Ventilators & pumps disinfected' },
          { id: 'icu-6-3', text: 'Floors clean and dry' },
          { id: 'icu-6-4', text: 'No clutter' },
          { id: 'icu-6-5', text: 'Cleaning schedule displayed' }
        ]
      },
      {
        id: 'icu-7',
        title: '7. Waste, Linen & Staff Practices',
        icon: 'Trash2',
        maxScore: 10,
        questions: [
          { id: 'icu-7-1', text: 'Correct waste segregation' },
          { id: 'icu-7-2', text: 'Sharps disposed safely' },
          { id: 'icu-7-3', text: 'Soiled linen bagged correctly' },
          { id: 'icu-7-4', text: 'Staff following IPC practices' },
          { id: 'icu-7-5', text: 'Visitors controlled' }
        ]
      }
    ]
  }
];
