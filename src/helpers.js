export const getImageUrl = imageId => {
	switch (imageId) {
		case 1:
			return "https://placehold.co/400x400/3498db/FFF";
		case 2:
			return "https://placehold.co/400x400/2ecc71/FFF";
		case 3:
			return "https://placehold.co/400x400/e74c3c/FFF";
		case 4:
			return "https://placehold.co/400x400/9b59b6/FFF";
		case 5:
			return "https://placehold.co/400x400/f1c40f/FFF";
		case 6:
			return "https://placehold.co/400x400/ff7f50/FFF";
		case 7:
			return "https://placehold.co/400x400/1abc9c/FFF";
		case 8:
			return "https://placehold.co/400x400/34495e/FFF";
		case 9:
			return "https://placehold.co/400x400/16a085/FFF";
		case 10:
			return "https://placehold.co/400x400/27ae60/FFF";
		case 11:
			return "https://placehold.co/400x400/2980b9/FFF";
		case 12:
			return "https://placehold.co/400x400/8e44ad/FFF";
		case 13:
			return "https://placehold.co/400x400/f39c12/FFF";
		case 14:
			return "https://placehold.co/400x400/d35400/FFF";
		case 15:
			return "https://placehold.co/400x400/c0392b/FFF";
		case 16:
			return "https://placehold.co/400x400/7f8c8d/FFF";
		case 17:
			return "https://placehold.co/400x400/00bcd4/FFF";
		case 18:
			return "https://placehold.co/400x400/009688/FFF";
		case 19:
			return "https://placehold.co/400x400/4caf50/FFF";
		case 20:
			return "https://placehold.co/400x400/8bc34a/FFF";
		case 21:
			return "https://placehold.co/400x400/cddc39/FFF";
		case 22:
			return "https://placehold.co/400x400/ffc107/FFF";
		case 23:
			return "https://placehold.co/400x400/ff9800/FFF";
		case 24:
			return "https://placehold.co/400x400/ff5722/FFF";
		case 25:
			return "https://placehold.co/400x400/795548/FFF";
		default:
			return "https://placehold.co/400x400/3498db/FFF";
	}
};

export const getImageId = () => Math.floor(Math.random() * (25 - 1 + 1)) + 1;
