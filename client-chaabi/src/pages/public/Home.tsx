import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Home: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { colors, gradients } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    const dashboardVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 0.5
            }
        }
    };

    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{backgroundColor: colors.primaryOpacity20}}></div>
          <div className="absolute top-40 -right-20 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{backgroundColor: colors.primaryOpacity30}}></div>
          <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-25 blur-3xl" style={{backgroundColor: colors.primaryOpacity20}}></div>
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-8 bg-white/80 backdrop-blur-sm border-b border-gray-100"
        >
          <div className="flex items-center space-x-3">
             <Link to="/dashboard" className="text-xl font-bold" style={{color: colors.primary}}>
                               <img src='/public/logo.png' alt='chaabi-bank' ></img>
                           </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <a
              href="#fonctionnalites"
              className="text-gray-700 transition-colors font-medium"
              onMouseEnter={(e) => e.target.style.color = colors.primary}
              onMouseLeave={(e) => e.target.style.color = 'rgb(55 65 81)'}
            >
              Fonctionnalités
            </a>

            <a
              href="#contact"
              className="text-gray-700 transition-colors font-medium"
              onMouseEnter={(e) => e.target.style.color = colors.primary}
              onMouseLeave={(e) => e.target.style.color = 'rgb(55 65 81)'}
            >
              Contact
            </a>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                style={{background: gradients.primary}}
              >
                Tableau de Bord
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                style={{background: gradients.primary}}
              >
                Connexion
              </Link>
            )}
          </motion.div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="inline-flex items-center border rounded-full px-4 py-2 text-sm font-medium" style={{backgroundColor: colors.primaryOpacity10, borderColor: colors.primaryOpacity30, color: colors.primaryDark}}>
                  <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                  Solution #1 en Maroc
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Gestion de{" "}
                  <span className="text-transparent bg-clip-text" style={{backgroundImage: gradients.primary}}>
                    Matériel
                  </span>{" "}
                  Simplifiée
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl"
              >
                Optimisez la gestion des demandes de matériel dans votre
                entreprise. Créez, validez et suivez vos bons de commande en
                temps réel.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      className="text-white px-6 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      style={{background: gradients.primary}}
                    >
                      Tableau de Bord
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="text-white px-6 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      style={{background: gradients.primary}}
                    >
                      Connexion
                    </Link>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-8 pt-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600 text-sm">Entreprises</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-gray-600 text-sm">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">-60%</div>
                  <div className="text-gray-600 text-sm">
                    Temps de Traitement
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Dashboard Preview */}
            <motion.div variants={dashboardVariants} className="relative">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-lg mx-auto relative overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-32 rounded-t-3xl" style={{background: gradients.primaryToDark}}></div>

                {/* Dashboard Header */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <span className="font-bold text-sm" style={{color: colors.primary}}>
                        📦
                      </span>
                    </div>
                    <span className="font-bold text-white text-lg">
                      GESTION
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-white/90">
                      Bonjour, Marie
                    </span>
                    <div className="w-10 h-10 rounded-full border-2 border-white" style={{background: `linear-gradient(to bottom right, #f59e0b, ${colors.primary})`}}></div>
                  </div>
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-50">
                      <div className="text-xs text-gray-500 mb-1">
                        Demandes en Cours
                      </div>
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="flex items-center text-orange-600 text-xs">
                        <span>En attente</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-50">
                      <div className="text-xs text-gray-500 mb-1">
                        Validées ce mois
                      </div>
                      <div className="text-2xl font-bold text-gray-900">48</div>
                      <div className="flex items-center text-green-600 text-xs">
                        <span>+15% ↗</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs">📝</span>
                      </div>
                      <div className="text-xs text-gray-700 font-medium">
                        Nouvelle Demande
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div className="text-xs text-gray-700 font-medium">
                        Valider
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl text-center">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs">📊</span>
                      </div>
                      <div className="text-xs text-gray-700 font-medium">
                        Rapports
                      </div>
                    </div>
                  </div>

                  {/* Recent Demands */}
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-gray-800">
                      Demandes Récentes
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl border" style={{backgroundColor: colors.primaryOpacity10, borderColor: colors.primaryOpacity30}}>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primaryOpacity20}}>
                            <span className="text-xs" style={{color: colors.primary}}>⏳</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Ordinateurs portables
                            </div>
                            <div className="text-xs text-gray-500">
                              IT - En attente
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-white px-2 py-1 rounded" style={{backgroundColor: colors.primary}}>
                          URGENT
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded-xl border border-green-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-xs">✓</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Fournitures bureau
                            </div>
                            <div className="text-xs text-gray-500">
                              RH - Validée
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-green-600">
                          BC-2024-001
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-xs">📦</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Équipements sécurité
                            </div>
                            <div className="text-xs text-gray-500">
                              Production - Livrée
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-blue-600">
                          TERMINÉ
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-800 text-sm">
                        Demandes par Mois
                      </span>
                      <span className="text-green-600 font-bold text-sm">
                        +25%
                      </span>
                    </div>
                    <div className="flex items-end space-x-1 h-12">
                      {[30, 45, 60, 40, 75, 85, 65].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 1 }}
                          className="flex-1 rounded-t-sm"
                          style={{background: gradients.primaryToLight}}
                        ></motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center"
                style={{background: `linear-gradient(to bottom right, #f59e0b, ${colors.primary})`}}
              >
                <span className="text-white text-xl">📋</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl shadow-lg flex items-center justify-center"
                style={{background: gradients.primaryToDark}}
              >
                <span className="text-white text-sm">✓</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Fonctionnalités Section */}
        <motion.section
          id="fonctionnalites"
          className="relative z-10 py-20 lg:py-32 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center border rounded-full px-4 py-2 text-sm font-medium mb-4" style={{backgroundColor: colors.primaryOpacity10, borderColor: colors.primaryOpacity30, color: colors.primaryDark}}>
                <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                Fonctionnalités Complètes
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Tout ce dont vous avez besoin pour{" "}
                <span className="text-transparent bg-clip-text" style={{backgroundImage: gradients.primary}}>
                  gérer efficacement
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une plateforme complète qui simplifie la gestion des demandes de
                matériel et optimise vos processus d'approvisionnement.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Créer Demandes */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{background: gradients.primaryToDark}}>
                  <span className="text-white text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Créer des Demandes
                </h3>
                <p className="text-gray-600 mb-6">
                  Interface intuitive pour créer rapidement des demandes de
                  matériel avec descriptions détaillées et priorités.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Formulaire simplifié
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Gestion des priorités
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Pièces jointes
                  </li>
                </ul>
              </motion.div>

              {/* Gestion Articles */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{background: gradients.primaryToDark}}>
                  <span className="text-white text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Gestion des Articles
                </h3>
                <p className="text-gray-600 mb-6">
                  Catalogue complet d'articles avec codes, descriptions, prix et
                  fournisseurs pour une sélection facilitée.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Catalogue centralisé
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Recherche avancée
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Gestion des stocks
                  </li>
                </ul>
              </motion.div>

              {/* Suivi Demandes */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{background: gradients.primaryToDark}}>
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Suivi en Temps Réel
                </h3>
                <p className="text-gray-600 mb-6">
                  Tableau de bord complet pour suivre l'état des demandes de la
                  création à la livraison.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Statuts en temps réel
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Notifications automatiques
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Historique complet
                  </li>
                </ul>
              </motion.div>

              {/* Génération Bon de Commande */}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{background: gradients.primaryToDark}}>
                  <span className="text-white text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Bons de Commande
                </h3>
                <p className="text-gray-600 mb-6">
                  Génération automatique de bons de commande professionnels
                  après validation des demandes.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Génération automatique
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Templates personnalisés
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: colors.primary}}></span>
                    Export PDF/Excel
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Workflow Process */}
            <motion.div
              className="mt-20"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Workflow de Validation Simplifié
              </h3>

              <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center lg:flex-1">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{background: gradients.primaryToDark}}>
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Agent crée la demande
                  </h4>
                  <p className="text-gray-600 text-sm">
                    L'agent saisit les articles nécessaires avec quantités et
                    justifications
                  </p>
                </div>

                <div className="hidden lg:flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.primary}}></div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center lg:flex-1">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{background: gradients.primaryToDark}}>
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Responsable valide
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Le responsable examine et approuve ou rejette la demande
                  </p>
                </div>

                <div className="hidden lg:flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.primary}}></div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center lg:flex-1">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{background: gradients.primaryToDark}}>
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    CEO approuve
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Validation finale par la direction pour les montants
                    importants
                  </p>
                </div>

                <div className="hidden lg:flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-orange-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.primary}}></div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center lg:flex-1">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{background: gradients.primaryToDark}}>
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    Bon de commande
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Génération automatique du bon de commande et envoi au
                    fournisseur
                  </p>
                </div>

                <div className="hidden lg:flex items-center">
                  <div className="w-16 h-1" style={{background: 'linear-gradient(to right, purple, #d98139)'}}></div>
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: colors.primary}}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    );
};
