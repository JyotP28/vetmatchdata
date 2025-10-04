import { motion } from 'framer-motion';

// container per blob
const Blob = ({ path1, path2, path3, path4, ...props }) => {
  return (
    <motion.div {...props}>
      <svg viewBox="0 0 500 500">
        <motion.path
          fill="currentColor"
          animate={{
            d: [path1, path2, path3, path4, path1],
          }}
          transition={{
            duration: 25,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </svg>
    </motion.div>
  );
};

export default function AnimatedBackground() {
  const shamrockGreen = '#009933';

  // SVG paths for the blob shapes
  const blob1_path1 = "M433.5,322.5Q413,395,348,432Q283,469,215,441Q147,413,101.5,361Q56,309,62,234.5Q68,160,119,109.5Q170,59,240.5,63Q311,67,364,111Q417,155,438,202.5Q459,250,433.5,322.5Z";
  const blob1_path2 = "M449,321Q409,392,347,433Q285,474,213.5,446.5Q142,419,114,357Q86,295,73,222.5Q60,150,113.5,103.5Q167,57,238,62Q309,67,370,109Q431,151,450,200.5Q469,250,449,321Z";
  const blob1_path3 = "M403.5,316Q398,382,336.5,411.5Q275,441,208.5,436Q142,431,99,376.5Q56,322,65,246Q74,170,116,118.5Q158,67,229,60.5Q300,54,350.5,103Q401,152,400.5,201Q400,250,403.5,316Z";
  const blob1_path4 = "M450,328.5Q424,407,354.5,441Q285,475,217.5,449Q150,423,100,371.5Q50,320,53,245Q56,170,105,115.5Q154,61,223,55.5Q292,50,361,86.5Q430,123,452.5,186.5Q475,250,450,328.5Z";

  const blob2_path1 = "M448,333Q434,416,359.5,448.5Q285,481,213.5,453Q142,425,79,375.5Q16,326,38,243Q60,160,112.5,105.5Q165,51,238,59Q311,67,370,108.5Q429,150,447.5,200Q466,250,448,333Z";
  const blob2_path2 = "M448,333.5Q435,417,360,447Q285,477,213,450Q141,423,94,369Q47,315,50,242.5Q53,170,105,116.5Q157,63,228,63.5Q299,64,362.5,103Q426,142,447.5,196Q469,250,448,333.5Z";
  const blob2_path3 = "M419.5,320Q407,390,341,421.5Q275,453,207.5,442.5Q140,432,87,379.5Q34,327,51.5,248.5Q69,170,118.5,118Q168,66,234.5,61.5Q301,57,357,101.5Q413,146,418,198Q423,250,419.5,320Z";
  const blob2_path4 = "M411,316.5Q399,383,334.5,409.5Q270,436,206.5,432Q143,428,94,377.5Q45,327,58,248.5Q71,170,122.5,123Q174,76,242.5,69Q311,62,364,104.5Q417,147,414,198.5Q411,250,411,316.5Z";

  return (
    <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1
    }}>
      {/* Blob 1 */}
      <Blob
        path1={blob1_path1} path2={blob1_path2} path3={blob1_path3} path4={blob1_path4}
        style={{
          position: 'absolute',
          top: '-25vh',    
          left: '-25vw',   
          width: '80vh',   
          height: '80vh',
          color: shamrockGreen,
          opacity: 0.2,
        }}
      />
      {/* Blob 2 */}
      <Blob
        path1={blob2_path1} path2={blob2_path2} path3={blob2_path3} path4={blob2_path4}
        style={{
          position: 'absolute',
          bottom: '-25vh',  
          right: '-25vw',  
          width: '75vh',   
          height: '75vh',
          color: shamrockGreen,
          opacity: 0.15,
        }}
      />
      {/* Blob 3 */}
      <Blob
        path1={blob1_path3} path2={blob2_path1} path3={blob1_path2} path4={blob2_path4}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vh',  
          height: '90vh',
          color: shamrockGreen,
          opacity: 0.04, 
        }}
      />
    </div>
  );
}