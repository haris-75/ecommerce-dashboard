import { useState, useEffect } from "react";
import { getRevenuePageData } from "../../../mockData";

export function useRevenueData() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [timeRange, setTimeRange] = useState("daily");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [platformFilter, setPlatformFilter] = useState("all");

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			const revenueData = getRevenuePageData();
			setData(revenueData);
			setLoading(false);
		}, 500);
	}, []);

	const getTimeRangeData = () => {
		if (!data) return [];

		switch (timeRange) {
			case "daily":
				return data.salesData.dailySales;
			case "monthly":
				return data.salesData.monthlySales;
			default:
				return data.salesData.dailySales;
		}
	};

	const getCategoryData = () => {
		if (!data) return [];

		if (categoryFilter === "all") {
			return data.salesData.categorySales;
		} else {
			return data.salesData.categorySales.filter(item => item.category === categoryFilter);
		}
	};

	const getPlatformData = () => {
		if (!data) return [];

		if (platformFilter === "all") {
			return data.salesData.platformSales;
		} else {
			return data.salesData.platformSales.filter(item => item.platform === platformFilter);
		}
	};

	const getAllCategories = () => {
		if (!data) return [];
		return [...new Set(data.salesData.categorySales.map(item => item.category))];
	};

	const getAllPlatforms = () => {
		if (!data) return [];
		return [...new Set(data.salesData.platformSales.map(item => item.platform))];
	};

	const getTimeRangeOrdersData = () => {
		if (!data) return [];

		return timeRange === "daily" ? data.salesData.dailyOrders : data.salesData.monthlyOrders;
	};

	return {
		data,
		loading,
		timeRange,
		setTimeRange,
		categoryFilter,
		setCategoryFilter,
		platformFilter,
		setPlatformFilter,
		timeRangeData: getTimeRangeData(),
		categoryData: getCategoryData(),
		platformData: getPlatformData(),
		categories: getAllCategories(),
		platforms: getAllPlatforms(),
		ordersData: getTimeRangeOrdersData(),
	};
}
