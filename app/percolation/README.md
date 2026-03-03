# Algorithme de Percolation

## Description

Le composant **Percolation** est une visualisation interactive d'un système de percolation, typiquement utilisé pour modéliser des phénomènes physiques comme la porosité d'un matériau (l'eau qui s'infiltre à travers un sol) ou la conductivité électrique.

Ce composant permet à l'utilisateur de :
1. **Définir la taille du système (N)** : Création d'une grille de taille $N \times N$.
2. **Ouvrir des sites** : Initialement, tous les sites de la grille sont bloqués (fermés). L'utilisateur peut cliquer sur n'importe quel site pour l'ouvrir.
3. **Verrouiller la configuration** : Une fois la grille finalisée, l'utilisateur peut terminer le processus pour empêcher toute modification ultérieure.

L'objectif de cette visualisation est de démontrer comment l'algorithme *Union-Find* (ou ensembles disjoints) peut être utilisé de manière optimale pour déterminer si le système "percole", c'est-à-dire s'il existe un chemin de sites ouverts reliant la rangée supérieure (le haut) à la rangée inférieure (le bas).

## Fonctionnalités

- **Configuration dynamique** : Choix de la taille de la grille (limité à $100 \times 100$ pour des raisons de performance).
- **Interface visuelle interactive** : Retour visuel immédiat lors de l'ouverture d'un site grâce à des animations (utilisant `framer-motion`).
  - **Création manuelle** : Cliquer individuellement sur les sites pour les ouvrir.
  - **Auto Construction** : Bouton permettant de générer une configuration système aléatoire en une seule fois.
  - **Noir/Gris foncé** : Site bloqué (fermé).
  - **Blanc** : Site ouvert.
- **États de la grille** : Gestion des états de la grille (en construction, verrouillé).

## Prochaines étapes

- Implémenter la structure de données **Union-Find** sous le capot pour évaluer la percolation.
- Ajouter la coloration visuelle des sites "pleins" (connectés au haut).
- Afficher un message de succès lorsque le système percole.
