import React, { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { FaCoffee, FaLeaf, FaGift, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router";



const carouselItems = [
    {
        id: 1,
        name: "Арабіка преміум",
        description: "Насичений смак з легкою кислинкою та м’яким післясмаком.",
    },
    {
        id: 2,
        name: "Ефіопська кава",
        description: "Легендарний сорт з нотами ягід і шоколаду.",
    },
    {
        id: 3,
        name: "Зелений чай Сенча",
        description: "Свіжість і бадьорість японських традицій.",
    },
    {
        id: 4,
        name: "Молочний улун",
        description: "Ніжний вершковий смак з довгим солодким післясмаком.",
    },
    {
        id: 5,
        name: "Авторські бленди",
        description: "Унікальні купажі, створені нашими обсмажувачами.",
    },
];

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const activeItem = carouselItems[activeIndex];

    return (
        <div className="bg-[#F5F0E6] text-[#3A3A2A]">

            <Parallax
                bgImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
                strength={400}
            >
                <div className="h-[600px] flex flex-col justify-center items-center text-white text-center px-4 bg-black bg-opacity-40">
                    <motion.h1
                        className="text-5xl font-bold mb-4 drop-shadow-lg"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Відкрий для себе світ кави та чаю
                    </motion.h1>
                    <motion.p
                        className="text-xl mb-6 drop-shadow-md max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {activeItem.name} — {activeItem.description}
                    </motion.p>

                </div>
            </Parallax>

            <section className="py-16 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-10">Категорії товарів</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Кава",
                            icon: <FaCoffee />,
                            link: "/catalog?category=coffee",
                        },
                        {
                            title: "Чай",
                            icon: <FaLeaf />,
                            link: "/catalog?category=tea",
                        },
                        {
                            title: "Аксесуари",
                            icon: <FaGift />,
                            link: "/catalog?category=accessories",
                        },
                    ].map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            className="relative overflow-hidden bg-white shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition group"
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            onClick={() => navigate(cat.link)}
                        >

                            <div className="relative z-10 p-6 flex flex-col items-center">
                                <div className="text-4xl mb-3 text-[#8BA573]">{cat.icon}</div>
                                <h3 className="text-xl font-semibold">{cat.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


            <section className="py-14 bg-[#8BA573] text-white text-center px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            icon: <FaTruck />,
                            title: "Швидка доставка",
                            desc: "Доставляємо по Україні протягом 1–3 днів.",
                        },
                        {
                            icon: <FaCoffee />,
                            title: "Свіжообсмажена кава",
                            desc: "Гарантуємо найкращу якість і аромат.",
                        },
                        {
                            icon: <FaLeaf />,
                            title: "Елітні сорти чаю",
                            desc: "Найкращі плантації Японії, Китаю та Шрі-Ланки.",
                        },
                        {
                            icon: <FaGift />,
                            title: "Подарункові набори",
                            desc: "Оформимо стильний подарунок до будь-якого свята.",
                        },
                    ].map((info, i) => (
                        <motion.div
                            key={i}
                            className="p-4 flex flex-col items-center bg-[#7EA066] rounded-xl shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <div className="text-3xl mb-3">{info.icon}</div>
                            <p className="text-lg font-semibold mb-1">{info.title}</p>
                            <p className="text-sm opacity-90">{info.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12">Культура споживання кави та чаю</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Ранок з чашкою кави",
                            text: "Почни день з аромату свіжообсмаженої арабіки та легкого світла світанку.",
                            img: "https://cdn.discordapp.com/attachments/1392860097247449338/1392860161613500486/pic1.jpg?ex=689d3bdc&is=689bea5c&hm=959137bca6db964c6abd74a596987188b16770762058f32781c177a14078448a&",
                        },
                        {
                            title: "Традиційне чаювання",
                            text: "Смакуй напій у стилі японської церемонії. Це більше, ніж чай — це ритуал спокою.",
                            img: "https://cdn.discordapp.com/attachments/1392860097247449338/1392860727038967839/pic2.jpg?ex=689d3c63&is=689beae3&hm=05e9ba9b9cd36fce92831222c54b3839640c3b7a26e1f960ec5002f8faf05d20&",
                        },
                        {
                            title: "Пауза на натхнення",
                            text: "Влаштуй собі мить тиші з улюбленим смаком. Нехай кава стане твоїм фокусом.",
                            img: "https://cdn.discordapp.com/attachments/1392860097247449338/1392861095089143879/pic3.jpg?ex=689d3cbb&is=689beb3b&hm=0f7b99e9f9ea469dc6c26334d3e87563baa71be7971f763adf87846145f03e28&",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <img src={item.img} alt={item.title} className="w-full h-80 object-cover" />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-[#3A3A2A] opacity-80">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
