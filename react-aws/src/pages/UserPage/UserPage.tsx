import { useEffect, useState } from "react";
import ProductCard from "../../components/User/ProductCard";
import type { ProductEntity } from "../../models/ProductEntity";
import "./UserPage.css";
import { fetchProducts } from "../../api/ProductApi";
import {
  Grid,
  Menu,
  Search,
  Filter,
  Star,
  TrendingUp,
  Clock,
  Gamepad2,
} from "lucide-react";

function UserPage() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return (Number(b.id) || 0) - (Number(a.id) || 0);
      }
    });

  const handleViewToggle = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  return (
    <div className="user-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <Gamepad2 className="gamepad-icon" />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Game Library</h1>
            <p className="hero-subtitle">Discover and play amazing games</p>
            <div className="hero-stats">
              <div className="stat-item">
                <TrendingUp className="stat-icon" />
                <span>{products.length} Games</span>
              </div>
              <div className="stat-item">
                <Star className="stat-icon" />
                <span>Premium Collection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-container">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="controls-right">
          <div className="sort-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="title">A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <button
            className={`filter-btn ${filterOpen ? "active" : ""}`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="filter-icon" />
            <span>Filter</span>
          </button>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => handleViewToggle("grid")}
              title="Grid View"
            >
              <Grid className="view-icon" />
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => handleViewToggle("list")}
              title="List View"
            >
              <Menu className="view-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="filter-panel">
          <div className="filter-content">
            <h3>Filter Options</h3>
            <div className="filter-section">
              <label>Price Range</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  className="price-input"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="price-input"
                />
              </div>
            </div>
            <div className="filter-actions">
              <button className="filter-clear">Clear All</button>
              <button className="filter-apply">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="results-info">
        <div className="results-count">
          <Clock className="results-icon" />
          <span>
            Showing {filteredProducts.length} of {products.length} games
            {searchTerm && ` for "${searchTerm}"`}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading games...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Gamepad2 />
            </div>
            <h3>No games found</h3>
            <p>
              {searchTerm
                ? `No games match your search for "${searchTerm}"`
                : "No games available in your library"}
            </p>
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div
            className={`products-grid ${
              viewMode === "list" ? "list-view" : "grid-view"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                quantity={product.quantity}
                imageUrl={product.imageUrl}
                description=""
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
