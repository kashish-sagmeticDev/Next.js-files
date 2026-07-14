export const metadata = {
	title: 'Admin',
};

export default function AdminLayout({ children }) {
	return (
		<section className="p-6">
			{children}
		</section>
	);
}
