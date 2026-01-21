import React from "react";
import { GamifiedLifeInterface } from "@/GamifiedLifeInterface";
import { ApiContext } from "../contexts/ApiContext";

export const useApi = (): GamifiedLifeInterface | undefined => {
	return React.useContext(ApiContext);
};
