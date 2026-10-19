import { consumeMessages } from "./rabbit/consumer";
import AnalyzeService from "./services/analyze.service";

const analyzeService = new AnalyzeService();

consumeMessages("analysis.requested", (gluco, channel) =>
	analyzeService.run(gluco, channel),
);
