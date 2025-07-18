"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  BookOpen,
  Microscope,
  Atom,
  Calculator,
  Eye,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

interface StudyResource {
  title: string
  description: string
  url: string
  type: "textbook" | "practice" | "video" | "reference"
}

interface StudyUnit {
  title: string
  resources: StudyResource[]
}

interface StudySection {
  title: string
  icon: React.ReactNode
  color: string
  units: StudyUnit[]
}

const studySections: StudySection[] = [
  {
    title: "General Chemistry",
    icon: <Atom className="h-6 w-6" />,
    color: "bg-blue-500",
    units: [
      {
        title: "Atomic Structure & Periodic Trends",
        resources: [
          {
            title: "Khan Academy - Electronic Structure of Atoms",
            description: "Video lessons on atomic structure and electron configuration",
            url: "https://www.khanacademy.org/science/chemistry/electronic-structure-of-atoms",
            type: "video",
          },
          {
            title: "OpenStax Chemistry - Electronic Structure and Periodic Properties",
            description: "Chapter on atomic structure and periodic trends",
            url: "https://openstax.org/books/chemistry-2e/pages/6-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Electronic Structure of Atoms",
            description: "Comprehensive coverage of atomic theory and electron configuration",
            url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/08%3A_Electrons_in_Atoms",
            type: "textbook",
          },
        ],
      },
      {
        title: "Chemical Bonding",
        resources: [
          {
            title: "Khan Academy - Chemical Bonds and Lewis Structure",
            description: "Video lessons on ionic, covalent, and metallic bonding",
            url: "https://www.khanacademy.org/science/chemistry/chemical-bonds",
            type: "video",
          },
          {
            title: "OpenStax Chemistry - Chemical Bonding and Molecular Geometry",
            description: "Chapters on chemical bonding theory and molecular shapes",
            url: "https://openstax.org/books/chemistry-2e/pages/7-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Chemical Bonding I: Basic Concepts",
            description: "Detailed bonding concepts and Lewis structures",
            url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/10%3A_Chemical_Bonding_I%3A_Basic_Concepts",
            type: "textbook",
          },
        ],
      },
      {
        title: "Acids and Bases",
        resources: [
          {
            title: "Khan Academy - Acids, Bases, and pH",
            description: "pH, pOH, and acid-base equilibria explained",
            url: "https://www.khanacademy.org/science/chemistry/acids-and-bases-topic",
            type: "video",
          },
          {
            title: "OpenStax Chemistry - Acid-Base Equilibria",
            description: "Chapter on acid-base chemistry and buffer systems",
            url: "https://openstax.org/books/chemistry-2e/pages/14-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Acids and Bases",
            description: "Comprehensive acid-base theory and calculations",
            url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/16%3A_Acids_and_Bases",
            type: "textbook",
          },
        ],
      },
      {
        title: "Thermodynamics",
        resources: [
          {
            title: "Khan Academy - Thermodynamics",
            description: "Energy changes in chemical reactions",
            url: "https://www.khanacademy.org/science/chemistry/thermodynamics-chemistry",
            type: "video",
          },
          {
            title: "OpenStax Chemistry - Thermochemistry",
            description: "Chapter on energy and thermodynamic principles",
            url: "https://openstax.org/books/chemistry-2e/pages/5-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Spontaneous Change: Entropy and Gibbs Energy",
            description: "Enthalpy, entropy, and Gibbs free energy concepts",
            url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/19%3A_Spontaneous_Change%3A_Entropy_and_Gibbs_Energy",
            type: "textbook",
          },
        ],
      },
      {
        title: "Chemical Kinetics",
        resources: [
          {
            title: "Khan Academy - Kinetics",
            description: "Reaction rates and mechanisms",
            url: "https://www.khanacademy.org/science/chemistry/chem-kinetics",
            type: "video",
          },
          {
            title: "OpenStax Chemistry - Chemical Kinetics",
            description: "Chapter on reaction rates and kinetic theory",
            url: "https://openstax.org/books/chemistry-2e/pages/12-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Chemical Kinetics",
            description: "Rate laws, reaction mechanisms, and kinetic theory",
            url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/14%3A_Chemical_Kinetics",
            type: "textbook",
          },
        ],
      },
      {
        title: "Electrochemistry",
        resources: [
          {
            title: "Khan Academy - Oxidation-Reduction Reactions",
            description: "Redox reactions and electrochemical cells",
            url: "https://www.khanacademy.org/science/chemistry/oxidation-reduction",
            type: "video",
          },
          {
            title: "OpenStax Chemistry - Electrochemistry",
            description: "Chapter on galvanic cells and electrolysis",
            url: "https://openstax.org/books/chemistry-2e/pages/17-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Electrochemistry",
            description: "Advanced electrochemical concepts and applications",
            url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/20%3A_Electrochemistry",
            type: "textbook",
          },
        ],
      },
    ],
  },
  {
    title: "Organic Chemistry",
    icon: <Atom className="h-6 w-6" />,
    color: "bg-purple-500",
    units: [
      {
        title: "Structure and Bonding",
        resources: [
          {
            title: "Khan Academy - Structure and Bonding",
            description: "Introduction to organic molecular structure and hybridization",
            url: "https://www.khanacademy.org/science/organic-chemistry/gen-chem-review",
            type: "video",
          },
          {
            title: "OpenStax Organic Chemistry - Structure and Bonding",
            description: "Chapter on organic molecular structure and bonding theory",
            url: "https://openstax.org/books/organic-chemistry/pages/1-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Structure and Bonding in Organic Molecules",
            description: "Detailed organic structure, hybridization, and resonance",
            url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_(Vollhardt_and_Schore)/01%3A_Structure_and_Bonding_in_Organic_Molecules",
            type: "textbook",
          },
        ],
      },
      {
        title: "Stereochemistry",
        resources: [
          {
            title: "Khan Academy - Stereochemistry",
            description: "3D molecular structures, chirality, and optical activity",
            url: "https://www.khanacademy.org/science/organic-chemistry/stereochemistry-topic",
            type: "video",
          },
          {
            title: "OpenStax Organic Chemistry - Stereochemistry",
            description: "Chapter on enantiomers, diastereomers, and chirality",
            url: "https://openstax.org/books/organic-chemistry/pages/5-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Stereoisomers",
            description: "Comprehensive stereochemistry concepts and examples",
            url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_(Vollhardt_and_Schore)/05%3A_Stereoisomers",
            type: "textbook",
          },
        ],
      },
      {
        title: "Alkanes and Cycloalkanes",
        resources: [
          {
            title: "Khan Academy - Alkanes and Cycloalkanes",
            description: "Alkane structure, nomenclature, and conformations",
            url: "https://www.khanacademy.org/science/organic-chemistry/alkanes-cycloalkanes",
            type: "video",
          },
          {
            title: "OpenStax Organic Chemistry - Alkanes",
            description: "Chapter on saturated hydrocarbon chemistry",
            url: "https://openstax.org/books/organic-chemistry/pages/3-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Structure and Reactivity: Alkanes",
            description: "Alkane properties, conformations, and basic reactions",
            url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_(Vollhardt_and_Schore)/02%3A_Structure_and_Reactivity",
            type: "textbook",
          },
        ],
      },
      {
        title: "Alkenes and Alkynes",
        resources: [
          {
            title: "Khan Academy - Alkenes and Alkynes",
            description: "Unsaturated hydrocarbon reactions and mechanisms",
            url: "https://www.khanacademy.org/science/organic-chemistry/alkenes-alkynes",
            type: "video",
          },
          {
            title: "OpenStax Organic Chemistry - Alkenes and Alkynes",
            description: "Chapters on addition and elimination reactions",
            url: "https://openstax.org/books/organic-chemistry/pages/7-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Alkenes: Structure and Reactivity",
            description: "Alkene and alkyne chemistry, addition reactions",
            url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_(Vollhardt_and_Schore)/11%3A_Alkenes%3A_Infrared_Spectroscopy_and_Mass_Spectrometry",
            type: "textbook",
          },
        ],
      },
      {
        title: "Aromatic Compounds",
        resources: [
          {
            title: "Khan Academy - Aromatic Compounds",
            description: "Benzene structure, aromaticity, and aromatic reactions",
            url: "https://www.khanacademy.org/science/organic-chemistry/aromatic-compounds",
            type: "video",
          },
          {
            title: "OpenStax Organic Chemistry - Aromatic Compounds",
            description: "Chapter on aromaticity and electrophilic aromatic substitution",
            url: "https://openstax.org/books/organic-chemistry/pages/15-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Benzene and Aromaticity",
            description: "Aromatic compound structure, reactions, and mechanisms",
            url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_(Vollhardt_and_Schore)/15%3A_Benzene_and_Aromaticity",
            type: "textbook",
          },
        ],
      },
      {
        title: "Carbonyl Chemistry",
        resources: [
          {
            title: "Khan Academy - Aldehydes and Ketones",
            description: "Carbonyl group reactions and mechanisms",
            url: "https://www.khanacademy.org/science/organic-chemistry/aldehydes-ketones",
            type: "video",
          },
          {
            title: "OpenStax Organic Chemistry - Aldehydes and Ketones",
            description: "Chapter on carbonyl compound reactions",
            url: "https://openstax.org/books/organic-chemistry/pages/19-introduction",
            type: "textbook",
          },
          {
            title: "ChemLibreTexts - Aldehydes and Ketones",
            description: "Comprehensive carbonyl chemistry and mechanisms",
            url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_(Vollhardt_and_Schore)/17%3A_Aldehydes_and_Ketones",
            type: "textbook",
          },
        ],
      },
    ],
  },
  {
    title: "Biology",
    icon: <Microscope className="h-6 w-6" />,
    color: "bg-green-500",
    units: [
      {
        title: "Cell Biology",
        resources: [
          {
            title: "Khan Academy - Structure of a Cell",
            description: "Cell organelles, membrane structure, and cellular processes",
            url: "https://www.khanacademy.org/science/biology/structure-of-a-cell",
            type: "video",
          },
          {
            title: "OpenStax Biology - Cell Structure and Function",
            description: "Chapter on cell biology and organelle functions",
            url: "https://openstax.org/books/biology-2e/pages/4-introduction",
            type: "textbook",
          },
          {
            title: "Biology LibreTexts - Cell Biology",
            description: "Advanced cell biology concepts and molecular mechanisms",
            url: "https://bio.libretexts.org/Bookshelves/Cell_and_Molecular_Biology/Book%3A_Basic_Cell_and_Molecular_Biology_(Bergtrom)",
            type: "textbook",
          },
        ],
      },
      {
        title: "Molecular Biology",
        resources: [
          {
            title: "Khan Academy - Central Dogma",
            description: "DNA replication, transcription, and translation",
            url: "https://www.khanacademy.org/science/biology/gene-expression-central-dogma",
            type: "video",
          },
          {
            title: "OpenStax Biology - Gene Expression",
            description: "Chapter on molecular biology and gene regulation",
            url: "https://openstax.org/books/biology-2e/pages/15-introduction",
            type: "textbook",
          },
          {
            title: "Biology LibreTexts - Molecular Biology",
            description: "Advanced molecular biology and genetic mechanisms",
            url: "https://bio.libretexts.org/Bookshelves/Genetics/Book%3A_Working_with_Molecular_Genetics_(Hardison)",
            type: "textbook",
          },
        ],
      },
      {
        title: "Genetics",
        resources: [
          {
            title: "Khan Academy - Classical Genetics",
            description: "Mendelian genetics, inheritance patterns, and genetic crosses",
            url: "https://www.khanacademy.org/science/biology/classical-genetics",
            type: "video",
          },
          {
            title: "OpenStax Biology - Mendel's Experiments and Heredity",
            description: "Chapter on genetic principles and inheritance",
            url: "https://openstax.org/books/biology-2e/pages/12-introduction",
            type: "textbook",
          },
          {
            title: "Biology LibreTexts - Classical Genetics",
            description: "Comprehensive genetics textbook with problem solving",
            url: "https://bio.libretexts.org/Bookshelves/Genetics/Book%3A_Online_Open_Genetics_(Nickle_and_Barrette-Ng)",
            type: "textbook",
          },
        ],
      },
      {
        title: "Evolution",
        resources: [
          {
            title: "Khan Academy - Evolution and Natural Selection",
            description: "Natural selection, speciation, and evolutionary mechanisms",
            url: "https://www.khanacademy.org/science/biology/her/evolution-and-natural-selection",
            type: "video",
          },
          {
            title: "OpenStax Biology - Evolution and the Origin of Species",
            description: "Chapter on evolutionary theory and evidence",
            url: "https://openstax.org/books/biology-2e/pages/18-introduction",
            type: "textbook",
          },
          {
            title: "Understanding Evolution (UC Berkeley)",
            description: "Comprehensive evolution education with interactive content",
            url: "https://evolution.berkeley.edu/evolibrary/home.php",
            type: "reference",
          },
        ],
      },
      {
        title: "Ecology",
        resources: [
          {
            title: "Khan Academy - Ecology",
            description: "Ecosystems, population dynamics, and environmental interactions",
            url: "https://www.khanacademy.org/science/biology/ecology",
            type: "video",
          },
          {
            title: "OpenStax Biology - Ecology and the Biosphere",
            description: "Chapter on population and community ecology",
            url: "https://openstax.org/books/biology-2e/pages/44-introduction",
            type: "textbook",
          },
          {
            title: "Biology LibreTexts - Ecology",
            description: "Advanced ecological concepts and environmental science",
            url: "https://bio.libretexts.org/Bookshelves/Ecology/Book%3A_Introduction_to_Environmental_Science_(Capon)",
            type: "textbook",
          },
        ],
      },
      {
        title: "Human Anatomy & Physiology",
        resources: [
          {
            title: "Khan Academy - Human Biology",
            description: "Human organ systems and physiological processes",
            url: "https://www.khanacademy.org/science/biology/human-biology",
            type: "video",
          },
          {
            title: "OpenStax Anatomy & Physiology - Introduction",
            description: "Complete human body systems coverage",
            url: "https://openstax.org/books/anatomy-and-physiology/pages/1-introduction",
            type: "textbook",
          },
          {
            title: "Biology LibreTexts - Human Biology",
            description: "Advanced human anatomy and physiology resources",
            url: "https://bio.libretexts.org/Bookshelves/Human_Biology/Book%3A_Human_Biology_(Wakim_and_Grewal)",
            type: "textbook",
          },
        ],
      },
    ],
  },
  {
    title: "Quantitative Reasoning",
    icon: <Calculator className="h-6 w-6" />,
    color: "bg-orange-500",
    units: [
      {
        title: "Algebra",
        resources: [
          {
            title: "Khan Academy - Algebra Basics",
            description: "Linear equations, inequalities, and algebraic expressions",
            url: "https://www.khanacademy.org/math/algebra-basics",
            type: "video",
          },
          {
            title: "OpenStax - College Algebra",
            description: "Comprehensive algebra textbook with practice problems",
            url: "https://openstax.org/books/college-algebra/pages/1-introduction-to-prerequisites",
            type: "textbook",
          },
          {
            title: "Math LibreTexts - Elementary Algebra",
            description: "Algebraic concepts and problem-solving techniques",
            url: "https://math.libretexts.org/Bookshelves/Algebra/Book%3A_Elementary_Algebra_(Ellis_and_Burzynski)",
            type: "textbook",
          },
        ],
      },
      {
        title: "Geometry",
        resources: [
          {
            title: "Khan Academy - Geometry",
            description: "Shapes, area, volume, angles, and geometric proofs",
            url: "https://www.khanacademy.org/math/geometry",
            type: "video",
          },
          {
            title: "Math is Fun - Geometry",
            description: "Interactive geometry lessons with visual examples",
            url: "https://www.mathsisfun.com/geometry/",
            type: "practice",
          },
          {
            title: "Math LibreTexts - Geometry",
            description: "Geometric principles and coordinate geometry",
            url: "https://math.libretexts.org/Bookshelves/Geometry/Book%3A_Geometry_with_an_Introduction_to_Cosmic_Topology_(Hitchman)",
            type: "textbook",
          },
        ],
      },
      {
        title: "Trigonometry",
        resources: [
          {
            title: "Khan Academy - Trigonometry",
            description: "Trig functions, identities, and applications",
            url: "https://www.khanacademy.org/math/trigonometry",
            type: "video",
          },
          {
            title: "Math is Fun - Trigonometry",
            description: "Interactive trigonometry lessons with examples",
            url: "https://www.mathsisfun.com/algebra/trigonometry.html",
            type: "practice",
          },
          {
            title: "Math LibreTexts - Trigonometry",
            description: "Trigonometric functions and identities",
            url: "https://math.libretexts.org/Bookshelves/Precalculus/Book%3A_Precalculus_(OpenStax)/07%3A_Trigonometric_Identities_and_Equations",
            type: "textbook",
          },
        ],
      },
      {
        title: "Statistics and Probability",
        resources: [
          {
            title: "Khan Academy - Statistics and Probability",
            description: "Descriptive statistics, probability, and data analysis",
            url: "https://www.khanacademy.org/math/statistics-probability",
            type: "video",
          },
          {
            title: "OpenStax - Introductory Statistics",
            description: "Statistical concepts and hypothesis testing",
            url: "https://openstax.org/books/introductory-statistics/pages/1-introduction",
            type: "textbook",
          },
          {
            title: "Statistics LibreTexts - Introductory Statistics",
            description: "Statistical analysis and probability theory",
            url: "https://stats.libretexts.org/Bookshelves/Introductory_Statistics/Book%3A_Introductory_Statistics_(Shafer_and_Zhang)",
            type: "textbook",
          },
        ],
      },
    ],
  },
  {
    title: "Perceptual Ability Test (PAT)",
    icon: <Eye className="h-6 w-6" />,
    color: "bg-indigo-500",
    units: [
      {
        title: "Apertures",
        resources: [
          {
            title: "123Test - Spatial Reasoning Test",
            description: "Free spatial reasoning practice with aperture-type questions",
            url: "https://www.123test.com/spatial-reasoning-test/",
            type: "practice",
          },
          {
            title: "Math is Fun - 3D Shapes",
            description: "Interactive 3D shape visualization and manipulation",
            url: "https://www.mathsisfun.com/geometry/3d-shapes.html",
            type: "practice",
          },
          {
            title: "ADA - DAT Perceptual Ability Test",
            description: "Official information about the PAT section",
            url: "https://www.ada.org/en/education-careers/dental-admission-test",
            type: "reference",
          },
        ],
      },
      {
        title: "View Recognition",
        resources: [
          {
            title: "Math is Fun - Interactive 3D Nets",
            description: "Interactive 3D net folding and view recognition exercises",
            url: "https://www.mathsisfun.com/geometry/nets-interactive.html",
            type: "practice",
          },
          {
            title: "123Test - Spatial Intelligence Test",
            description: "Spatial intelligence tests including view recognition",
            url: "https://www.123test.com/spatial-intelligence-test/",
            type: "practice",
          },
          {
            title: "GeoGebra - 3D Calculator",
            description: "Interactive 3D geometry visualization tool",
            url: "https://www.geogebra.org/3d",
            type: "practice",
          },
        ],
      },
      {
        title: "Angle Ranking",
        resources: [
          {
            title: "Math is Fun - Angles",
            description: "Interactive angle measurement and comparison exercises",
            url: "https://www.mathsisfun.com/geometry/angles.html",
            type: "practice",
          },
          {
            title: "GeoGebra - Geometry",
            description: "Interactive geometry tools for angle practice",
            url: "https://www.geogebra.org/geometry",
            type: "practice",
          },
          {
            title: "Khan Academy - Angles",
            description: "Video lessons on angle measurement and properties",
            url: "https://www.khanacademy.org/math/geometry/hs-geo-foundations/hs-geo-angle-intro",
            type: "video",
          },
        ],
      },
      {
        title: "Hole Punching",
        resources: [
          {
            title: "Math is Fun - Paper Folding Nets",
            description: "Interactive paper folding and hole punching visualization",
            url: "https://www.mathsisfun.com/geometry/nets-interactive.html",
            type: "practice",
          },
          {
            title: "GeoGebra - Interactive Math Tools",
            description: "Mathematical visualization tools for folding exercises",
            url: "https://www.geogebra.org/",
            type: "practice",
          },
          {
            title: "123Test - Spatial Reasoning",
            description: "Spatial reasoning exercises including folding problems",
            url: "https://www.123test.com/spatial-reasoning-test/",
            type: "practice",
          },
        ],
      },
      {
        title: "Cube Counting",
        resources: [
          {
            title: "Math is Fun - Volume and 3D Shapes",
            description: "3D shapes, volume calculations, and cube counting",
            url: "https://www.mathsisfun.com/geometry/volume.html",
            type: "practice",
          },
          {
            title: "GeoGebra - 3D Shapes",
            description: "Interactive 3D shape manipulation and counting",
            url: "https://www.geogebra.org/3d",
            type: "practice",
          },
          {
            title: "Khan Academy - Volume and Surface Area",
            description: "Video lessons on 3D shapes and volume calculations",
            url: "https://www.khanacademy.org/math/geometry/hs-geo-solids",
            type: "video",
          },
        ],
      },
      {
        title: "Pattern Folding",
        resources: [
          {
            title: "Math is Fun - 3D Shape Nets",
            description: "Interactive net folding for various 3D shapes",
            url: "https://www.mathsisfun.com/geometry/nets-interactive.html",
            type: "practice",
          },
          {
            title: "GeoGebra - Geometry Tools",
            description: "Pattern folding and geometric visualization tools",
            url: "https://www.geogebra.org/geometry",
            type: "practice",
          },
          {
            title: "Khan Academy - 3D Shapes and Nets",
            description: "Understanding 3D shapes and their 2D nets",
            url: "https://www.khanacademy.org/math/geometry/hs-geo-solids",
            type: "video",
          },
        ],
      },
    ],
  },
  {
    title: "Reading Comprehension",
    icon: <FileText className="h-6 w-6" />,
    color: "bg-teal-500",
    units: [
      {
        title: "Scientific Reading Strategies",
        resources: [
          {
            title: "Khan Academy - Reading Strategies",
            description: "Effective reading comprehension techniques for academic texts",
            url: "https://www.khanacademy.org/test-prep/sat/x0a8c2e5f:reading-and-writing/x0a8c2e5f:reading-strategies",
            type: "practice",
          },
          {
            title: "Dartmouth Academic Skills - Reading Strategies",
            description: "Active reading strategies for scientific literature",
            url: "https://students.dartmouth.edu/academic-skills/learning-resources/learning-strategies/reading-strategies",
            type: "reference",
          },
          {
            title: "NIH - How to Read a Scientific Paper",
            description: "Guide to reading and understanding scientific literature",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3687192/",
            type: "reference",
          },
        ],
      },
      {
        title: "Scientific Literature Practice",
        resources: [
          {
            title: "Scientific American",
            description: "Current science articles for reading comprehension practice",
            url: "https://www.scientificamerican.com/",
            type: "reference",
          },
          {
            title: "Nature Scitable",
            description: "Educational science articles with comprehension focus",
            url: "https://www.nature.com/scitable/",
            type: "reference",
          },
          {
            title: "Smithsonian Magazine - Science",
            description: "Science and nature articles for reading practice",
            url: "https://www.smithsonianmag.com/science-nature/",
            type: "reference",
          },
        ],
      },
      {
        title: "Critical Analysis Skills",
        resources: [
          {
            title: "Khan Academy - Critical Reading",
            description: "Analyzing arguments and evidence in scientific texts",
            url: "https://www.khanacademy.org/test-prep/sat/x0a8c2e5f:reading-and-writing/x0a8c2e5f:critical-reading",
            type: "practice",
          },
          {
            title: "National Geographic - Science",
            description: "Science articles with critical thinking components",
            url: "https://www.nationalgeographic.com/science/",
            type: "reference",
          },
          {
            title: "BBC Science & Environment",
            description: "Current science news for reading comprehension practice",
            url: "https://www.bbc.com/news/science_and_environment",
            type: "reference",
          },
        ],
      },
    ],
  },
]

// Function to get study resources for a specific category
export const getStudyResourcesForCategory = (category: string): StudyResource[] => {
  const categoryMap: { [key: string]: StudyResource[] } = {
    Biology: [
      {
        title: "Khan Academy - Biology",
        description: "Comprehensive biology video lessons",
        url: "https://www.khanacademy.org/science/biology",
        type: "video",
      },
      {
        title: "OpenStax Biology",
        description: "Free biology textbook",
        url: "https://openstax.org/books/biology-2e/pages/1-introduction",
        type: "textbook",
      },
    ],
    "General Chemistry": [
      {
        title: "Khan Academy - Chemistry",
        description: "Video lessons on general chemistry topics",
        url: "https://www.khanacademy.org/science/chemistry",
        type: "video",
      },
      {
        title: "OpenStax Chemistry",
        description: "Free general chemistry textbook",
        url: "https://openstax.org/books/chemistry-2e/pages/1-introduction",
        type: "textbook",
      },
    ],
    "Organic Chemistry": [
      {
        title: "Khan Academy - Organic Chemistry",
        description: "Organic chemistry video lessons",
        url: "https://www.khanacademy.org/science/organic-chemistry",
        type: "video",
      },
      {
        title: "OpenStax Organic Chemistry",
        description: "Free organic chemistry textbook",
        url: "https://openstax.org/books/organic-chemistry/pages/1-introduction",
        type: "textbook",
      },
    ],
    "Quantitative Reasoning": [
      {
        title: "Khan Academy - Math",
        description: "Comprehensive math video lessons",
        url: "https://www.khanacademy.org/math",
        type: "video",
      },
      {
        title: "Math is Fun",
        description: "Interactive math lessons and practice",
        url: "https://www.mathsisfun.com/",
        type: "practice",
      },
    ],
    "Perceptual Ability": [
      {
        title: "123Test - Spatial Reasoning",
        description: "Free spatial reasoning practice tests",
        url: "https://www.123test.com/spatial-reasoning-test/",
        type: "practice",
      },
      {
        title: "Math is Fun - 3D Shapes",
        description: "Interactive 3D visualization exercises",
        url: "https://www.mathsisfun.com/geometry/3d-shapes.html",
        type: "practice",
      },
    ],
  }

  return categoryMap[category] || []
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "textbook":
      return "bg-blue-100 text-blue-800"
    case "video":
      return "bg-red-100 text-red-800"
    case "practice":
      return "bg-green-100 text-green-800"
    case "reference":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "textbook":
      return <BookOpen className="h-4 w-4" />
    case "video":
      return "🎥"
    case "practice":
      return "📝"
    case "reference":
      return "📚"
    default:
      return <BookOpen className="h-4 w-4" />
  }
}

export default function StudyGuides() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  const [expandedUnits, setExpandedUnits] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  const toggleUnit = (unitKey: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitKey]: !prev[unitKey],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">DAT Study Guides by Topic</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Organized study resources by specific units and topics. All links go directly to the specific topic content
          within each educational resource.
        </p>
      </div>

      {/* Study Sections */}
      <div className="space-y-4">
        {studySections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="overflow-hidden">
            <CardHeader
              className={`${section.color} text-white cursor-pointer`}
              onClick={() => toggleSection(section.title)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </div>
                {expandedSections[section.title] ? (
                  <ChevronDown className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </div>
              <CardDescription className="text-white/90">
                {section.units.length} topic areas • Click to expand
              </CardDescription>
            </CardHeader>

            {expandedSections[section.title] && (
              <CardContent className="p-0">
                {section.units.map((unit, unitIndex) => {
                  const unitKey = `${section.title}-${unit.title}`
                  return (
                    <div key={unitIndex} className="border-b last:border-b-0">
                      <div
                        className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleUnit(unitKey)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg text-gray-900">{unit.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{unit.resources.length} resources</Badge>
                            {expandedUnits[unitKey] ? (
                              <ChevronDown className="h-5 w-5" />
                            ) : (
                              <ChevronRight className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                      </div>

                      {expandedUnits[unitKey] && (
                        <div className="p-4 bg-white">
                          <div className="grid gap-4 md:grid-cols-2">
                            {unit.resources.map((resource, resourceIndex) => (
                              <div
                                key={resourceIndex}
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <h5 className="font-medium text-base">{resource.title}</h5>
                                  <Badge variant="secondary" className={getTypeColor(resource.type)}>
                                    <span className="flex items-center gap-1">
                                      {getTypeIcon(resource.type)}
                                      {resource.type}
                                    </span>
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{resource.description}</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-transparent"
                                  onClick={() => window.open(resource.url, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Open Resource
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Study Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">How to Use These Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Study Strategy:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• Focus on one topic at a time</li>
                <li>• Start with textbook resources for foundation</li>
                <li>• Use videos to clarify difficult concepts</li>
                <li>• Practice with interactive resources</li>
                <li>• Test knowledge with daily questions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Resource Types:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>
                  • 📚 <strong>Textbooks:</strong> Comprehensive theory
                </li>
                <li>
                  • 🎥 <strong>Videos:</strong> Visual explanations
                </li>
                <li>
                  • 📝 <strong>Practice:</strong> Interactive exercises
                </li>
                <li>
                  • 📚 <strong>Reference:</strong> Additional reading
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
