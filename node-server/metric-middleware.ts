import { requestCount, requestduration } from "./prometheus";

export const metricMiddleWare = (req: any, res: any, next: any) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    requestCount.inc({
      method: req.method,
      url: req.route ? req.route.path : req.path,
      status: res.statusCode.toString(),
    });

    requestduration.observe(
      {
        method: req.method,
        path: req.route ? req.route.path : req.path,
      },
      duration,
    );
  });

  next();
};
