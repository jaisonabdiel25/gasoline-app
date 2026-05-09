import { FormVehicle } from "@/modules";
import { getVehicleById } from "@/services";

const Editvehiclepage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const response = await getVehicleById(id);

  return <FormVehicle vehicle={response.data} isEdit />;
};

export default Editvehiclepage;
