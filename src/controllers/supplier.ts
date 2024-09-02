import SupplierModel from "../models/SupplierModel";

const addNew = async (req: any, res: any) => {
  const body = req.body;
  // const {} = body

  try {
    const newSupplier = new SupplierModel(body);
    newSupplier.save();

    res.status(200).json({
      message: "Add new Supplier",
      data: newSupplier,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { addNew };
