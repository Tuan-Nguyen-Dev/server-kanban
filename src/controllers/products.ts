const getProducts = (req: any, res: any) => {
  try {
    res.status(200).json({
      message: "Product",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { getProducts };
