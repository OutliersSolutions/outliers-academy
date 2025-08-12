"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  ShoppingCart,
  Factory,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/Buttons/Button.component";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { chartData, fadeInUp, staggerContainer } from "@/data";
import { useTranslation } from "react-i18next";


export const OdooSystemSection = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const benefits = [] as {
    title: string;
    description: string;
  }[];

  return (
    <section className="relative overflow-hidden pt-2 sm:pt-4 md:pt-6 lg:pt-10 xl:pt-28 pb-4 sm:pb-6 md:pb-8 lg:pb-32 xl:pb-32 text-gray-600 dark:text-gray-300 leading-relaxed">
      <div className="container mx-auto relative z-10 p-10">
        <div className="grid gap-4 lg:gap-16 xl:gap-20 grid-cols-1 lg:grid-cols-2">

          {/* Contenido izquierdo */}
          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <h2
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('systems.odoo_section.title') }}
              />
              <p className="mt-4 text-base md:text-lg">
                {t('systems.odoo_section.description')}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-8 space-y-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group flex items-start gap-4 rounded-lg border border-transparent bg-white dark:bg-gray-800 p-4 transition-all hover:border-coral-100 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-coral-50 dark:bg-gray-700 transition-colors group-hover:bg-coral-100">
                    {/* Íconos fijos */}
                    {[BarChart3, Calendar, ShoppingCart, Factory, Settings][index % 5] && (
                      React.createElement([BarChart3, Calendar, ShoppingCart, Factory, Settings][index % 5], {
                        className: "w-5 h-5 text-coral dark:text-coral"
                      })
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contenido derecho */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">

                {/* Header del gráfico */}
                <div className="bg-OdooPrimary p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="h-6 w-6" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5">

                  {/* Navegación de íconos */}
                  <div className="mb-5 flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                    {[BarChart3, Calendar, ShoppingCart, Factory, Settings].map((Icon, i) => (
                      <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                        <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    ))}
                  </div>

                  {/* Estadísticas */}
                  <div className="mb-5 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                      <p className="text-xs">{t('systems.odoo_section.stats.monthly_sales')}</p>
                      <p className="text-lg font-semibold">$128,430</p>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-1.5 w-3/4 rounded-full bg-OdooPrimary" />
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                      <p className="text-xs">{t('systems.odoo_section.stats.production')}</p>
                      <p className="text-lg font-semibold">1,240 unidades</p>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-1.5 w-4/5 rounded-full bg-OdooPrimary" />
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de barras */}
                  <div className="mb-5 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold">{t('systems.odoo_section.stats.annual_performance')}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-OdooPrimary"></span> {t('systems.odoo_section.stats.sales')}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-OdooSecondary"></span> {t('systems.odoo_section.stats.costs')}
                        </div>
                      </div>
                    </div>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                          <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                          <Tooltip
                            wrapperClassName="rounded-lg shadow-md bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
                            contentStyle={{ borderRadius: "8px", borderColor: "#e5e7eb" }}
                          />
                          <Bar dataKey="ventas" fill="#985184" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="costos" fill="#1AD3BB" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Tareas */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-800 p-2">
                      <span className="text-xs font-medium">{t('systems.odoo_section.tasks.update_inventory')}</span>
                      <span className="rounded-full bg-yellow-100 dark:bg-yellow-900 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-300">
                        {t('systems.odoo_section.tasks.in_progress')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-800 p-2">
                      <span className="text-xs font-medium">{t('systems.odoo_section.tasks.pending_orders')}</span>
                      <span className="rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                        {t('systems.odoo_section.tasks.completed')}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
