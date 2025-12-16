import React from "react";
import powerpress from "../assets/power press.jpg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import drilling from '../assets/drilling.jpg'
import welding from '../assets/welding2.jpg'
import Contact from '../components/contact'
function Infra() {
  function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: string,
  ) {
    return { name, calories, fat, carbs };
  }

  const rows = [
    createData("Press Capacity", "Heavy-duty forming", "Medium-duty forming", "Light-duty forming"),
    createData("MS Thickness Range", "Up to 10 mm", "Up to 6 mm", "Up to 3 mm"),
    createData("Suitable Operations", "Deep drawing, heavy bending", "Bending, punching", "Punching, trimming"),
    createData("Tool Compatibility", "Large & complex dies", "Medium dies", "Small dies"),
    createData("Accuracy & Stability", "High precision, rigid frame", "Stable performance", "Standard precision"),
    createData("Production Scale", "High-volume production", "Medium-volume", "Low-volume / job work"),
  ];


  const drillingRows = [
    createData("Suitable Material", "Thick MS plates & blocks", "Medium MS sections", "Thin MS sheets & sections"),
    createData("Typical Operations", "Heavy drilling, boring, tapping", "Drilling, reaming", "Drilling, light tapping"),
    createData("Accuracy & Finish", "High accuracy", "Good accuracy", "Good accuracy"),
    createData("Tool Size Support", "Large drills & cutters", "Medium tools", "Small tools"),
    createData("Typical Applications", "Base plates, flanges, thick brackets", "Frames, channels, plates", "Sheets, angles, light brackets"),
    createData("Production Use", "Continuous heavy-duty", "General fabrication", "Light fabrication"),
  ];




  return (
    <div className="bg-[#FFFBF5] flex flex-col gap-12">
      <div className="heading h-[25vh] lg:h-[35vh] flex items-end pr-4 pl-4 lg:pl-10 ">
        <h1 className="text-4xl lg:text-7xl border-b-1 lg:border-none lg:pb-0 pb-6 text-[#352E2E] uppercase font-[primary]">
          Our Infrastructure
        </h1>
      </div>

      <div className="machine-container  text-[#352E2E] flex w-full  flex-col lg:flex-row p-4 lg:p-10 gap-8">

        <div className="img-container lg:h-[80vh] h-[40vh] w-[100%] lg:w-[40vw]  overflow-hidden rounded-sm">
          <img src={powerpress} alt="" className="w-full hover:scale-108 duration:20 transition-all ease:[power.in]  h-full object-cover" />
        </div>

        <div className="specs-contaier flex flex-col w-full lg:w-[50vw] p-4 gap-8">
          <div className="heading text-7xl uppercase font-[primary]">
            <h1>Power Press</h1>
          </div>

          <div className="spec-table w-full ">

            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                className="bg-[#FFFBF5] border-none "
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow >
                    <TableCell>Specifications</TableCell>
                    <TableCell align="right">150 Ton Press</TableCell>
                    <TableCell align="right">80 Ton Press</TableCell>
                    <TableCell align="right">40 Ton Press</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>



      <div className="machine-container  text-[#352E2E] flex w-full lg:flex-row-reverse  flex-col p-4 lg:p-10 gap-8">

        <div className="img-container lg:h-[80vh] h-[40vh] w-[100%] lg:w-[40vw]  overflow-hidden rounded-sm">
          <img src={drilling} alt="" className="w-full hover:scale-120 duration:20 transition-all ease:[power.in]  h-full object-center scale-108" />
        </div>

        <div className="specs-contaier flex flex-col w-full lg:w-[50vw] p-4 gap-8">
          <div className="heading text-7xl text-[#352E2E] font-[primary] uppercase">
            <h1>Drilling</h1>
          </div>

          <div className="spec-table w-full">

            <TableContainer >
              <Table
                sx={{ minWidth: 650 }}
                className="bg-[#FFFBF5] border-none "
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Specifications</TableCell>
                    <TableCell align="right">Ø60 mm</TableCell>
                    <TableCell align="right">Ø40 mm</TableCell>
                    <TableCell align="right">Ø25 mm</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drillingRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>



      <div className="machine-container  text-[#352E2E] flex w-full  flex-col lg:flex-row p-4 lg:p-10 gap-8">

        <div className="img-container lg:h-[80vh] h-[40vh] w-[100%] lg:w-[40vw]  overflow-hidden rounded-sm">
          <img src={welding} alt="" className="w-full hover:scale-108 duration:20 transition-all ease:[power.in]  h-full object-center" />
        </div>

        <div className="specs-contaier  flex flex-col w-full lg:w-[50vw] p-4 gap-12">
          <div className="heading text-7xl text-[#352E2E] font-[primary] uppercase">
            <h1>CO2 Welding</h1>
          </div>

          <div className="spec-table flex flex-col  gap-4 text-[#352E2E]">

            <h5 className="font-[medium] font-extrabold">Strong • Fast • Consistent Welding</h5>
            <p className="font-[light] max-w-[70%]">Used for high-quality welding of mild steel components, the CO₂ welding machine delivers strong penetration, smooth finish, and reliable performance for industrial fabrication.</p>
            
            <div className="flex gap-2 mt-4 lg:mt-22 font-[medium] font-extrabold text-[#352E2E] flex-col">

              <div>• Strength – Deep penetration and high joint strength</div>
              <div>• Speed – Continuous, high-speed welding</div>
              <div>• Precision – Smooth, uniform weld finish</div>

            </div>
           
          </div>
        </div>
      </div>



        <Contact/>
    </div>
  );
}

export default Infra;
